# -*- coding: utf-8 -*-
'''信息展示接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint, make_response
from model import info
from flask_jwt_extended import (create_access_token, get_jwt_identity,get_jwt_claims, fresh_jwt_required,set_access_cookies, unset_jwt_cookies)
from marshmallow import Schema, fields
app = Blueprint('info', __name__, url_prefix='/api')  # pylint: disable=c0103


@app.route("/project", methods=['GET'])
@fresh_jwt_required
def project_list():
    '''获取所有项目列表

    GET /api/project
    '''
    return make_response(jsonify(message="success", data=info.project_list(), status=200), 200)
    # return jsonify(info.project_list())


@app.route("/project", methods=['POST'])
@fresh_jwt_required
def project_add():
    '''创建新项目

    POST /api/project
    '''
    if not request.json or\
        not 'name' in request.json or\
        not 'detail' in request.json:
        abort(400)
    # return make_response(jsonify(message="success", data=info.project_add(request.json), status=201), 201)
    return info.project_add(request.json)


@app.route("/task", methods=['GET'])
@fresh_jwt_required
def task_list():
    '''获取所有任务列表

    GET /api/task
    '''
    return make_response(jsonify(message="success", data=info.task_list(), status=200), 200)
    # return info.task_list()
