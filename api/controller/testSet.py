# -*- coding: utf-8 -*-
'''测试集接口'''

from flask import jsonify, request
from flask_jwt_extended import (fresh_jwt_required)

from model import testSet


@fresh_jwt_required
def search_test_set():
    '''获取测试集详情

    GET /api/test_set
    '''
    return jsonify({
        'msg': 'ok',
        'data': testSet.review_test_set(request.args.get('testSetId'))
    }), 200


@fresh_jwt_required
# @identity.check_permission("create", 'testSet')
def add_test_set():
    '''添加测试集

    POST /api/test_set
    '''
    data = request.json

    if testSet.find_test_set_by_name(data['name']):
        return jsonify({"msg": '测试集名称重复！'}), 400

    return jsonify({
        'msg': 'ok',
        'data': testSet.create_test_set(data)
    }), 200


@fresh_jwt_required
# @identity.check_permission("update", 'testSet')
def update_test_set():
    '''更新测试集信息

    PUT /api/project/test_set
    '''
    data = request.json

    if not testSet.find_test_set_by_id(data['id']):
        return jsonify({"msg": '无该条测试集，请刷新重试！'}), 400

    return jsonify({
        'msg': 'ok',
        'data': testSet.update_test_set(data)
    }), 200


@fresh_jwt_required
def search_case_list():
    '''模糊查询测试案例

    GET /api/testSet/searchCase
    '''

    return jsonify({
        'msg': 'ok',
        'data': list(testSet.search_case_list(
            request.args.get('title'),
            request.args.get('releaseId')
        ))
    })


@fresh_jwt_required
def search_test_member():
    '''模糊查询测试案例

    GET /api/testSet/searchMember
    '''

    return jsonify({
        'msg': 'ok',
        'data': list(testSet.find_test_set_member(request.args.get('releaseId')))
    })
