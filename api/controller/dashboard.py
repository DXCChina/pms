# -*- coding: utf-8 -*-
'''用户管理接口

@author: Wang Qianxiang
'''
from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
from marshmallow import Schema, fields
from flask import jsonify, request, abort, Blueprint, session
from rbac.context import PermissionDenied

from model import dashboard
# app = Blueprint('user', __name__, url_prefix='/api')  # pylint: disable=c0103


@fresh_jwt_required
def project_demand(project_id):
    '''获取项目需求

    GET /api/dashboard/<int:project_id>/demand
    '''
    return jsonify(dashboard.findRoleByMId(project_id, get_jwt_identity()))


@fresh_jwt_required
def project_activity(project_id):
    '''获取项目活动

    GET /api/dashboard/<int:project_id>/activity
    '''
    print(get_jwt_identity())
    print(get_jwt_claims())
    return jsonify(dashboard.findRoleByMId(project_id, get_jwt_identity()))


@fresh_jwt_required
def project_test_case(project_id):
    '''获取项目测试案例

    GET /api/dashboard/<int:project_id>/case
    '''
    return jsonify(dashboard.findRoleByMId(project_id, get_jwt_identity()))


@fresh_jwt_required
def project_test_result(project_id):
    '''获取项目测试结果

    GET /api/dashboard/<int:project_id>/result
    '''
    return jsonify(dashboard.findRoleByMId(project_id, get_jwt_identity()))
