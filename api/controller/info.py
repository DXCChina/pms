# -*- coding: utf-8 -*-
'''信息展示接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint, make_response, session
from model import info
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
from marshmallow import Schema, fields
app = Blueprint('info', __name__, url_prefix='/api')  # pylint: disable=c0103

from playhouse.shortcuts import model_to_dict, dict_to_model

class projectNewSchema(Schema):
    '''项目新建信息'''
    name = fields.String(required=True)
    detail = fields.String(required=False)
    startDate = fields.DateTime(required=True)
    endDate = fields.DateTime(required=True)
    type = fields.String(required=True)

# @app.route("/project", methods=['GET'])
@fresh_jwt_required
def project_list():
    '''获取所有项目列表

    GET /api/project
    '''
    if 'user_id' in session:
        ownerId = session['user_id']

    return jsonify(info.project_list(ownerId))


# @app.route("/project", methods=['POST'])
@fresh_jwt_required
def project_add():
    '''创建新项目

    POST /api/project
    '''
    print(request.json)
    if not request.json or\
        not 'name' in request.json:
        return jsonify({"msg": "Missing json in request"}), 400

    schema = projectNewSchema()
    data, errors = schema.load(request.json)
    print(data, errors)
    if errors:
        return jsonify({"msg": errors}), 400
    if find_one_project_by_name(data["name"]):
        return jsonify({"msg": "项目名称重复"}), 200

    if 'user_id' in session:
        data['ownerId'] = session['user_id']
    print(data)

    return info.project_add(data), 201


@fresh_jwt_required
def set_role():
    pass

# @app.route("/task", methods=['GET'])
@fresh_jwt_required
def task_list():
    '''获取所有任务列表

    GET /api/task
    '''
    # return make_response(jsonify(message="success", data=info.task_list(), status=200), 200)
    return jsonify(info.task_list())

@fresh_jwt_required
def find_one_project_by_name(project_name):
    '''查找项目名

    GET /api/project/name/{project_name}
    '''
    try:
        result = info.find_one_project_by_name(project_name)
    except Exception as err:
        result = None
    return result