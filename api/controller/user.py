# -*- coding: utf-8 -*-
'''用户管理接口

@author: Wang Jianhui
'''

from flask import jsonify, request, Blueprint, session
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
from marshmallow import Schema, fields
from passlib.hash import argon2

from model import user
# app = Blueprint('user', __name__, url_prefix='/api')  # pylint: disable=c0103


class UserLoginSchema(Schema):
    '''登录信息'''
    username = fields.String(required=True)
    password = fields.String(required=True)


class UserRegSchema(Schema):
    '''注册信息'''
    username = fields.String(required=True)
    email = fields.Email(required=True)
    password = fields.String(required=True)


class UserUpdateSchema(Schema):
    '''用户更新信息'''
    username = fields.String(required=True)
    email = fields.Email(required=True)


class PasswordChangeSchema(Schema):
    '''密码修改信息'''
    new_password = fields.String(required=True)
    old_password = fields.String(required=True)


# @app.route("/user", methods=['POST'])
def reg():
    '''用户注册

    POST /api/user

    Body:

    JSON UserRegSchema:
    * username = fields.String(required=True)
    * email = fields.Email(required=True)
    * password = fields.String(required=True)

    Returns:
    1. Success 200 {id:userid}
    2. Error
    * 400 {msg:{错误字段:字段提示信息}}
    * 500

    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = UserRegSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400
    if user.findOneByEmail(data['email']):
        return jsonify({"msg": ('email', '邮箱已存在')}), 400
    if user.findOneByName(data['username']):
        return jsonify({"msg": ('username', '用户名已存在')}), 400
    data['password'] = argon2.hash(data['password'])
    user.save(data)
    # data = user.findOneByName(data['username'])
    return jsonify(result=True)


# @app.route("/login", methods=['POST'])
def login():
    '''用户登录

    POST /api/login
    * 添加Token(建议)和session(不推荐,服务重启出现数据不一致)
    * 获取当前用户ID:get_jwt_identity()
    * 获取当前用户详情:get_jwt_claims()
    * session方式获取用户信息(不推荐):session['user_id']
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = UserLoginSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400
    account = user.findOneByName(data['username'])
    if not account:
        return jsonify({"msg": {'username': '用户名不存在'}}), 400
    elif argon2.verify(data['password'], account.password):
        access_token = create_access_token(
            identity={
                'id': account.id,
                'username': account.username,
                'email': account.email
            },
            fresh=True)
        resp = jsonify({'access_token': access_token})
        set_access_cookies(resp, access_token)
        session['user_id'] = account.id
        return resp
    else:
        return jsonify({"msg": "用户名或密码错误"}), 403


# @app.route("/user", methods=['GET'])
@fresh_jwt_required
def user_info():
    '''获取用户信息

    GET /api/user

    * curl -H "Authorization: Bearer $ACCESS" http://localhost:5000/api/user
    * 或 Cookie:access_token_cookie(默认)

    '''
    return jsonify(get_jwt_claims())


# @app.route("/user", methods=['PUT'])
@fresh_jwt_required
def user_update():
    '''更新用户信息

    PUT /api/user
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = UserUpdateSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400
    current_user = get_jwt_claims()
    if current_user['email'] == data['email']:
        # data.pop('email', None)
        pass
    elif user.findOneByEmail(data['email']):
        return jsonify({"msg": ('email', '邮箱已存在')}), 400
    if current_user['username'] == data['username']:
        # data.pop('username', None)
        pass
    elif user.findOneByName(data['username']):
        return jsonify({"msg": ('username', '用户名已存在')}), 400
    data['id'] = get_jwt_identity()
    user.update(data)
    data.pop('password', None)
    access_token = create_access_token(identity=data, fresh=True)
    resp = jsonify({'access_token': access_token})
    set_access_cookies(resp, access_token)
    session['user_id'] = data['id']
    return resp


# @app.route("/password", methods=['PUT'])
@fresh_jwt_required
def change_password():
    '''修改密码

    PUT /api/password
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = PasswordChangeSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400
    account = user.findOneById(get_jwt_identity())
    if argon2.verify(data['old_password'], account['password']):
        user.change_password(get_jwt_identity(),
                             argon2.hash(data['new_password']))
        return jsonify({"OK": "OK"})
    else:
        return jsonify({"msg": "密码错误"}), 403


# @app.route("/logout", methods=['GET'])
def logout():
    '''退出登录

    GET /api/logout
    '''
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    session.pop('user_id', None)
    return resp


# 找回密码
