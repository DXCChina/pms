# -*- coding: utf-8 -*-
'''用户管理接口

@author: Wang Qianxiang
'''
import json

from flask_jwt_extended import (get_jwt_identity, fresh_jwt_required)

from model import dashboard


@fresh_jwt_required
def project_demand(release_id):
    '''获取项目需求

    GET /api/dashboard/<int:release_id>/demand
    '''
    if dashboard.find_owner_by_release(release_id) == get_jwt_identity():
        res = dashboard.find_all_demand(release_id)
    elif dashboard.find_role_by_release(release_id, get_jwt_identity()) != '':
        res = dashboard.find_demand(release_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_activity(release_id):
    '''获取项目活动

    GET /api/dashboard/<int:release_id>/activity
    '''
    if dashboard.find_owner_by_release(release_id) == get_jwt_identity():
        res = dashboard.find_all_activity(release_id)
    elif dashboard.find_role_by_release(release_id, get_jwt_identity()) != '':
        res = dashboard.find_activity(release_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_test_case(release_id):
    '''获取项目测试案例

    GET /api/dashboard/<int:release_id>/testCase
    '''
    if dashboard.find_owner_by_release(release_id) == get_jwt_identity():
        res = dashboard.find_all_test_case(release_id)
    elif dashboard.find_role_by_release(release_id, get_jwt_identity()) == 'test':
        res = dashboard.find_test_case(release_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_test_set(release_id):
    '''获取项目测试集

    GET /api/dashboard/<int:release_id>/testSet
    '''
    if dashboard.find_owner_by_release(release_id) == get_jwt_identity():
        res = dashboard.find_all_test_set(release_id)
    elif dashboard.find_role_by_release(release_id, get_jwt_identity()) == 'test':
        res = dashboard.find_test_set(release_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res


@fresh_jwt_required
def project_test_result(release_id):
    '''获取项目测试结果

    GET /api/dashboard/<int:release_id>/testResult
    '''
    if dashboard.find_owner_by_release(release_id) == get_jwt_identity():
        res = dashboard.find_all_test_result(release_id)
    elif dashboard.find_role_by_release(release_id, get_jwt_identity()) == 'dev':
        res = dashboard.find_test_result_for_dev(release_id, get_jwt_identity())
    elif dashboard.find_role_by_release(release_id, get_jwt_identity()) == 'test':
        res = dashboard.find_test_result_for_test(release_id, get_jwt_identity())
    else:
        return json.dumps({"msg": "No permission!"}), 403
    return res
