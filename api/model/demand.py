# -*- coding: utf-8 -*-
'''需求管理操作

@author: Gao Le
'''
from flask import jsonify
from .db import Demand, Activity
from .role import identity
from playhouse.shortcuts import JOIN


# @identity.check_permission("create", 'demand')
def create_demand(demand):
    '''新建需求'''

    return Demand.get_or_create(
        title=demand['title'],
        defaults={
            'detail': demand['detail'],
            'level': demand['level'],
            'projectId': demand['projectId'],
            'releaseId': demand['releaseId']
        })


def demand_detail(demandId):
    '''获取需求详情'''
    return Demand.sfind(Demand, Activity.title.alias('activityTittle')).join(
        Activity,JOIN.LEFT_OUTER, on=(Demand.activityId == Activity.id
                      )).where(Demand.id == demandId).get()


# @identity.check_permission("update", 'demand')
def update_demands(demand):
    Demand.update(
        title=demand['title'],
        detail=demand['detail'],
        level=demand['level']
        ).where(Demand.id == demand['id']).execute()
    return Demand.getOne(Demand.id == demand['id'])


def find_one_demand_by_title(title):
    return Demand.getOne(Demand.title == title)


def find_demand_title_by_id(id):
    return Demand.getOne(Demand.id == id).title


def find_demand_list_match_str(title):
    '''模糊查询需求'''
    return Demand.sfind().where(Demand.title.contains(title)).dicts()