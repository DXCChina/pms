# -*- coding: utf-8 -*-
'''活动管理接口

@author: Wang Jianhui
'''

from flask import request
from model.db import database, Activity, Demand, ActivityBase, ProjectMember, User
from model.role import identity

from flask_jwt_extended import (fresh_jwt_required)


def demand_activity_add(activity_id, data):
    '''添加活动需求'''
    for demand_id in data:
        demand = Demand.get(Demand.id == demand_id)
        if not demand.activityId:
            demand.activityId = activity_id
            # Demand.update(activityId=activity_id).where(Demand.id == demand_id).execute()
            demand.save()


def demand_activity_del(activity_id, data):
    '''删除活动需求'''
    for demand_id in data:
        demand = Demand.get(Demand.id == demand_id)
        if demand.activityId == activity_id:
            demand.activityId = None
            # Demand.update(activityId=activity_id).where(Demand.id == demand_id).execute()
            demand.save()


@fresh_jwt_required
@identity.check_permission("create", 'activity')
def activity_add():
    '''创建项目活动'''
    data = request.json
    if 'memberId' in data and data['memberId']:
        data['status'] = 'dev-ing'
    with database.atomic():
        activity_id = ActivityBase.create(**data).id
        demand_activity_add(activity_id, data['demand'])
    return {"msg": 'ok'}


@fresh_jwt_required
@identity.check_permission("update", 'activity')
def activity_update():
    '''更新项目活动'''
    data = request.json
    activity_id = data.pop('activityId')
    if 'memberId' in data and (not 'status' in data or not data['status']):
        data['status'] = 'dev-ing'
    with database.atomic():
        demand_activity_add(activity_id, data.pop('demand'))
        demand_activity_del(activity_id, data.pop('del_demand'))
        Activity.update(**data).where(Activity.id == activity_id).execute()
    return {"msg": 'ok'}


@fresh_jwt_required
def activity_list():
    '''项目活动列表'''

    return {
        "data": list(Activity.find().where(
            Activity.projectId == request.args.get('projectId')
        ))
    }


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
        "data": list(ProjectMember.find(ProjectMember.role, User).join(User).where(
            ProjectMember.projectId == project_id
        ))
    }
