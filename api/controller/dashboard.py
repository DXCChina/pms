# -*- coding: utf-8 -*-
'''用户管理接口

@author: Wang Qianxiang
'''
import json

from flask_jwt_extended import (get_jwt_identity, fresh_jwt_required)

from model import dashboard


@fresh_jwt_required
def project_demand(project_id):
    '''获取项目需求

    GET /api/dashboard/<int:project_id>/demand
    '''
    if dashboard.find_owner(project_id) == get_jwt_identity():
        res = dashboard.find_all_demand(project_id)
    elif dashboard.find_role(project_id, get_jwt_identity()).role:
        res = dashboard.find_demand(project_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_activity(project_id):
    '''获取项目活动

    GET /api/dashboard/<int:project_id>/activity
    '''
    if dashboard.find_owner(project_id) == get_jwt_identity():
        res = dashboard.find_all_activity(project_id)
    elif dashboard.find_role(project_id, get_jwt_identity()):
        res = dashboard.find_activity(project_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_test_case(project_id):
    '''获取项目测试案例

    GET /api/dashboard/<int:project_id>/case
    '''
    if dashboard.find_role(project_id, get_jwt_identity()).role == 'test':
        res = dashboard.find_test_case(project_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_test_result(project_id):
    '''获取项目测试结果

    GET /api/dashboard/<int:project_id>/result
    '''
    if dashboard.find_owner(project_id) == get_jwt_identity():
        res = dashboard.find_all_test_result(project_id)
    elif dashboard.find_role(project_id, get_jwt_identity()).role == 'dev':
        res = dashboard.find_test_result_for_dev(project_id, get_jwt_identity())
    elif dashboard.find_role(project_id, get_jwt_identity()).role == 'test':
        res = dashboard.find_test_result_for_test(project_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res

@fresh_jwt_required
def project_test_set(project_id):
    pass