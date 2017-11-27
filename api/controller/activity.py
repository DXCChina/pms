# -*- coding: utf-8 -*-
'''活动管理接口

@author: Wang Jianhui
'''

from flask import jsonify, request, abort, Blueprint, session
from model.db import Activity, Demand,ActivityDB
from model.role import identity

from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
from rbac.context import PermissionDenied


@fresh_jwt_required
@identity.check_permission("create", 'activity')
def activity_add():
    '''创建活动'''
    data = request.json
    print('===========',ActivityDB.create(**data).id)
    for demand_id in data['demand']:
        demand = Demand.find(Demand.id == demand_id)
        print(demand,'================')
        # Demand.select(id).where(Demand.id == demand_id)
        if demand:
            return jsonify({"msg": '需求\'%s\'已存在于活动' % (demand['title'])}), 400
        # Demand.update(activityId=data[]).where(Demand.id == demand_id)
