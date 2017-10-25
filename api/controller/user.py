# -*- coding: utf-8 -*-
'''用户管理接口

@author: Wang Jianhui
'''

import re
from flask import jsonify, request, abort, Blueprint
from passlib.hash import pbkdf2_sha256
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)

from model import user
app = Blueprint('user', __name__, url_prefix='/api')  # pylint: disable=c0103

alphanumeric = re.compile(r'^[0-9a-zA-Z_]*$')
email_address = re.compile(r'[a-zA-z0-9\.]+@[a-zA-Z0-9]+\.+[a-zA-Z]')


@app.route("/user", methods=['POST'])
def reg():
    '''添加用户(用户注册)

    POST /api/user
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    email = request.json.get('email', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400

    request.json['password'] = pbkdf2_sha256.hash(request.json['password'])
    return jsonify(user.save(request.json))


@app.route("/login", methods=['POST'])
def login():
    '''用户登录

    POST /api/login
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    account = user.findOneByName(username)
    if not account:
        return 'NotFound'
    elif not 'password' in account:
        return account
    elif pbkdf2_sha256.verify(password, account['password']):
        access_token = create_access_token(identity=account, fresh=True)
        resp = jsonify({'access_token': access_token})
        set_access_cookies(resp, access_token)
        return resp, 200
    else:
        return jsonify({"msg": "Bad username or password"}), 401


@app.route("/logout", methods=['GET'])
def logout():
    '''退出登录

    GET /api/logout
    '''
    resp = jsonify({'logout': True})
    unset_jwt_cookies(resp)
    return resp, 200


@app.route("/user", methods=['GET'])
@fresh_jwt_required
def user_info():
    '''获取用户信息

    GET /api/user
    curl -H "Authorization: Bearer $ACCESS" http://localhost:5000/api/user
    OR Cookie:access_token_cookie
    '''
    print(get_jwt_identity(), get_jwt_claims())
    account = user.findOneByName(get_jwt_identity())
    return jsonify(account)


@app.route("/user", methods=['PUT'])
@fresh_jwt_required
def user_update():
    '''更新用户信息

    PUT /api/user
    '''
    if not request.json:
        abort(400)
    return jsonify(user.update('user_id', request.json))


@app.route("/password", methods=['PUT'])
@fresh_jwt_required
def change_password():
    '''修改密码

    PUT /api/password
    '''
    if not request.json:
        abort(400)
    return jsonify(user.update('user_id', request.json))


# 找回密码
