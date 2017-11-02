#!/usr/bin/env python
'''
API入口

不包含任何业务逻辑
'''
from datetime import timedelta
from os import environ
from flask import Flask, jsonify
from flask_jwt_extended import (JWTManager)
from controller import bps

app = Flask(__name__)  # pylint:disable=c0103
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

jwt = JWTManager(app)  # pylint:disable=c0103


@jwt.user_identity_loader
def user_identity_lookup(user):
    '''JWT 用户 ID 设置'''
    return user['id']


@jwt.user_claims_loader
def add_claims_to_access_token(user):
    '''JWT 用户信息设置'''
    return user


@app.errorhandler(404)
def not_found():
    '''自定义404提示信息'''
    return jsonify({'msg': 'NotFound'}), 404


for bp in bps:
    app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        debug='PY_ENV' in environ and environ['PY_ENV'] == 'dev')
