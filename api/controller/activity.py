# -*- coding: utf-8 -*-
'''活动管理接口

@author: Wang Jianhui
'''

from flask import jsonify, request, abort, Blueprint, session
from model.db import Activity, Demand, ActivityBase
from model.role import identity

from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
from rbac.context import PermissionDenied


@fresh_jwt_required
@identity.check_permission("create", 'activity')
def activity_add():
    '''创建项目活动'''
    data = request.json
    activity_id = ActivityBase.create(**data).id
    for demand_id in data['demand']:
        demand = Demand.get(Demand.id == demand_id)
        if demand.activityId:
            return jsonify({"msg": '需求\'%s\'已分配' % (demand.title)}), 400
        demand.activityId = activity_id
        # Demand.update(activityId=activity_id).where(Demand.id == demand_id).execute()
        demand.save()
    return {"msg": 'ok'}


@fresh_jwt_required
def demand_search():
    '''模糊查询项目需求
        GET /api/demand?title=aaa&projectId=1
    '''
    return {
        "data": list(Demand.find().where(
            Demand.projectId == request.args.get('projectId'),
            Demand.title % ('%' + request.args.get('title') + '%')
        ))
    }


@fresh_jwt_required
def project_user(project_id):
    '''查询项目成员
        GET /api/project/<int:project_id>/users
    '''
    return {
        "data": list(Demand.find().where(Demand.projectId == project_id, Demand.title % ('%' + demand_title + '%')))
    }
