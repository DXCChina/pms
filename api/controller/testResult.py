# -*- coding: utf-8 -*-
'''测试结果管理接口

@author: Wang Qianxiang
'''

from flask import jsonify, request
from flask_jwt_extended import (fresh_jwt_required, get_jwt_identity)
from playhouse.shortcuts import model_to_dict

from model import testResult


@fresh_jwt_required
def search_test_result():
    '''获取测试结果详情

    GET /api/test_result
    '''
    return jsonify({
        'msg':
        'ok',
        'data':
        testResult.test_result_detail(request.args.get('testResultId'))
    }), 200


@fresh_jwt_required
# @identity.check_permission("create", 'testResult')
def add_test_result():
    '''添加测试结果

    POST /api/test_result
    '''
    data = request.json
    data['ownerId'] = get_jwt_identity()

    if testResult.find_test_result_by_case(data['caseId']):
        return jsonify({"msg": '该案例已有测试结果！'}), 400

    return jsonify({
        'msg':
        'ok',
        'data':
        model_to_dict(testResult.create_test_result(data)[0])
    }), 201


@fresh_jwt_required
# @identity.check_permission("update", 'testResult')
def update_test_result():
    '''更新测试结果信息

    PUT /api/project/test_result
    '''
    data = request.json
    data['ownerId'] = get_jwt_identity()

    if not testResult.find_test_result_by_id(data['id']):
        return jsonify({"msg": '无该条测试结果，请刷新重试！'}), 400

    return jsonify({
        'msg': 'ok',
        'data': testResult.update_test_results(data)
    }), 200
