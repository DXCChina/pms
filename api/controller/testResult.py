# -*- coding: utf-8 -*-
'''测试结果管理接口

@author: Wang Qianxiang
'''

from flask import jsonify, request
from flask_jwt_extended import (get_jwt_identity, fresh_jwt_required)
from marshmallow import Schema, fields
from rbac.context import PermissionDenied

from model import testResult


class AddTestResultSchema(Schema):
    '''添加测试结果信息'''    
    name = fields.String(required=True)
    detail = fields.String(required=False)
    caseId = fields.String(required=True)
    output = fields.Integer(required=True)
    result = fields.Integer(required=True)
    status = fields.Integer(required=True)
    level = fields.Integer(required=False)
    priority = fields.Integer(required=False)


class ChangeTestResultSchema(Schema):
    '''修改测试结果信息'''    
    id = fields.String(required=True)
    name = fields.String(required=True)
    detail = fields.String(required=False)
    caseId = fields.String(required=True)
    output = fields.Integer(required=True)
    result = fields.Integer(required=True)
    status = fields.Integer(required=True)
    level = fields.Integer(required=False)
    priority = fields.Integer(required=False)
    

@fresh_jwt_required
def add_test_result():
    '''添加测试结果

    POST /api/project/test_result
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = AddTestResultSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400
    try:
        res = testResult.create_test_result(data)
        return jsonify({'msg': 'ok', 'data': res}), 200
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'}), 400


@fresh_jwt_required
def update_test_result():
    '''更新测试结果信息

    PUT /api/project/test_result/up date
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = ChangeTestResultSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400
    if not testResult.find_test_result_by_id(data['id']):
        return jsonify({"msg": '无该条测试结果，请刷新重试！'}), 400
    if testResult.find_test_result_by_caseId(data['caseId']):
        return jsonify({"msg": '该案例已有测试结果！'}), 400
    if testResult.find_test_result_by_name(data['name']):
        return jsonify({"msg": '该测试结果名称重复！'}), 400
    try:
        res = testResult.create_test_result(data)
        return jsonify({'msg': 'ok', 'data': res}), 200
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'}), 400


@fresh_jwt_required
def search_test_result(test_result_id):
    '''获取测试结果详情

    GET /api/project/test_result/detail/<int:test_result_id>
    '''
    return jsonify({'msg': 'ok', 'data': testResult.test_result_detail(test_result_id)})
