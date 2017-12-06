#!/usr/bin/env python
'''
API入口

不包含任何业务逻辑
'''
from datetime import timedelta
from os import environ
from flask_jwt_extended import (JWTManager)
from model.db import database, User, Demand, Activity, ActivityMember, Project, ProjectMember, TestCase, TestResult
import connexion
from flask import request, session, jsonify
from rbac.context import PermissionDenied
from peewee import DoesNotExist
from flask_graphql import GraphQLView
from graph.schema import schema
# pylint:disable=c0103
application = connexion.App(
    __name__, specification_dir='../docs')  # pylint:disable=c0103
application.add_api('swagger.yml')
app = application.app
app.config['USE_X_SENDFILE'] = True
app.config['SECRET_KEY'] = environ['JWT_SECRET_KEY']
app.config['JSON_AS_ASCII'] = False
app.config['JWT_SECRET_KEY'] = environ['JWT_SECRET_KEY']  # JWT 加密密钥串
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']  # JWT Token 保存位置
app.config['JWT_SESSION_COOKIE'] = False  # 不使用临时 Cookie
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = False  # 开发环境临时禁用
app.config['JWT_COOKIE_SECURE'] = False  # 开发环境临时禁用
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)  # Token 过期时间
app.config['DEBUG'] = 'PY_ENV' in environ and environ['PY_ENV'] == 'dev'
app.add_url_rule(
    '/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

jwt = JWTManager(app)  # pylint:disable=c0103


@jwt.user_identity_loader
def user_identity_lookup(user):
    '''JWT 用户 ID 设置'''
    return user['id']


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    '''JWT 用户信息设置'''
    return user


@app.before_request
def init():
    '''在请求收到之前绑定一个函数'''
    if database.is_closed():
        database.connect()
    # project_id 加入 session
    if request.method == 'POST' or request.method == 'PUT':
        if not request.is_json:
            return jsonify({"msg": "Missing JSON in request"}), 400
        if 'projectId' in request.json:
            session['project_id'] = request.json['projectId']
        if 'activityId' in request.json:
            session['task_id'] = request.json['activityId']


@app.after_request
def after_request(response):
    '''每一个请求之后绑定一个函数，如果请求没有异常'''
    return response


@app.teardown_request
def _db_close(exception=None):
    '''每一个请求之后绑定一个函数，即使遇到了异常'''
    if exception:
        print('teardown_request', exception)
    if not database.is_closed():
        database.close()


@app.errorhandler(PermissionDenied)
def deny(msg):
    '''无权限'''
    print(msg, 'PermissionDenied')
    return jsonify({'msg': 'PermissionDenied'}), 400


@app.errorhandler(DoesNotExist)
def does_not_exist(msg):
    '''数据库数据不存在'''
    print(msg, 'DoesNotExist')
    return jsonify({'msg': 'DoesNotExist'}), 404


if __name__ == "__main__":
    print('初始化数据库')
    database.create_tables(
        [User, Demand, Activity, ActivityMember, Project,
            ProjectMember, TestCase, TestResult],
        safe=True)

    application.run(
        host='PY_IP' in environ and environ['PY_IP'] or "0.0.0.0",
        port='PY_PORT' in environ and environ['PY_PORT'] or 5000,
        debug=app.config['DEBUG'])
