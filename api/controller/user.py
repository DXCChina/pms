# -*- coding: utf-8 -*-
'''用户管理接口

@author: Wang Jianhui
'''

import re
from flask import jsonify, request, abort, Blueprint
from model import user
app = Blueprint('user', __name__, url_prefix='/api')  # pylint: disable=c0103

alphanumeric = re.compile(r'^[0-9a-zA-Z_]*$')
email_address = re.compile(r'[a-zA-z0-9\.]+@[a-zA-Z0-9]+\.+[a-zA-Z]')


@app.route("/user", methods=['POST'])
def reg():
    '''添加用户(用户注册)

    POST /api/user
    '''
    if not request.json or\
        not 'username' in request.json or\
        not 'password' in request.json or\
        not 'email' in request.json:
        abort(400)
    return jsonify(user.save(request.json))


@app.route("/login", methods=['POST'])
def login():
    '''用户登录

    POST /api/login
    '''
    if not request.json or not 'username' in request.json or not 'password' in request.json:
        abort(400)
    return jsonify(user.findOneByName(request.json['username']))


@app.route("/logout", methods=['GET'])
def logout():
    '''退出登录

    GET /api/logout
    '''
    return 'developing'


@app.route("/user", methods=['GET'])
def user_info():
    '''获取用户信息

    GET /api/user
    '''
    return jsonify(user.findOneById('user_id'))


@app.route("/user", methods=['PUT'])
def user_update():
    '''更新用户信息

    PUT /api/user
    '''
    if not request.json:
        abort(400)
    return jsonify(user.update('user_id', request.json))


@app.route("/password", methods=['PUT'])
def change_password():
    '''修改密码

    PUT /api/password
    '''
    if not request.json:
        abort(400)
    return jsonify(user.update('user_id', request.json))


# 找回密码
