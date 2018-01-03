# -*- coding: utf-8 -*-
'''用例管理接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint
from model import case

from flask_jwt_extended import (
    get_jwt_identity,
    fresh_jwt_required,
)
from marshmallow import Schema, fields
from rbac.context import PermissionDenied
from playhouse.shortcuts import model_to_dict

app = Blueprint('case', __name__, url_prefix='/api')  # pylint: disable=c0103


class TestCaseSchema(Schema):
    '''添加需求信息'''
    name = fields.String(required=True)
    detail = fields.String(required=True)
    type = fields.String(required=True)
    status = fields.String(required=True)
    demandId = fields.Integer(required=True)
    input = fields.String(required=True)
    expect = fields.String(required=True)
    projectId = fields.Integer(required=True)
    releaseId = fields.Integer(required=True)


@fresh_jwt_required
def case_add():
    '''添加测试用例

    POST /api/project/case
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = TestCaseSchema()
    data, errors = schema.load(request.json)
    data['ownerId'] = get_jwt_identity()
    if (errors):
        return jsonify({"msg": errors}), 400
    try:
        data = case.create_case(data)
        if data[1] == False:
            return jsonify({"msg": "测试用例名称重复"}), 200
        elif data[1] == True:
            return jsonify({'msg': 'ok', 'data': model_to_dict(data[0])}), 201
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'})


def case_update():
    '''更新需求信息

    PUT /api/project/case
    '''

    if not request.json:
        abort(400)
    if case.find_name_by_id(request.json["id"]) == request.json['name']:
        pass
    elif case.find_one_case_by_title(request.json["name"]):
        return jsonify({'msg': '该测试用例已存在'})
    try:
        data = case.case_update(request.json)
        return jsonify({'msg': 'ok', 'data': model_to_dict(data)})
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'})


def case_detail(case_id):
    return jsonify({'msg': 'ok', 'data': case.case_detail(case_id)})
