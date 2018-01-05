# -*- coding: utf-8 -*-
'''需求管理接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint
from model import demand
from model.db import Demand

from flask_jwt_extended import (fresh_jwt_required)
from marshmallow import Schema, fields
from rbac.context import PermissionDenied
from playhouse.shortcuts import model_to_dict

app = Blueprint('demand', __name__, url_prefix='/api')  # pylint: disable=c0103


class DemandSchema(Schema):
    '''添加需求信息'''
    title = fields.String(required=True)
    detail = fields.String(required=True)
    level = fields.String(required=True)
    projectId = fields.Integer(required=True)
    activityId = fields.Integer(required=False)
    status = fields.Integer(required=False)


def find_demand_list_match_str(title):
    '''模糊查询需求列表

    GET /api/project/demand/<str:title>
    '''

    return jsonify({
        'msg': 'ok',
        'data': list(demand.find_demand_list_match_str(title))
    })


@fresh_jwt_required
def demand_search():
    '''模糊查询项目需求
        GET /api/demand?title=aaa&projectId=1
    '''
    return {
        "data":
        list(Demand.find().where(
            Demand.projectId == request.args.get('projectId'),
            Demand.title % ('%' + request.args.get('title') + '%')))
    }


@fresh_jwt_required
def demand_add():
    '''添加需求

    POST /api/project/demand
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = DemandSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400

    try:
        data = demand.create_demand(request.json)
        if data[1] == False:
            return jsonify({"msg": "需求名称重复"}), 200
        elif data[1] == True:
            return jsonify({'msg': 'ok', 'data': model_to_dict(data[0])}), 201
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'})


@fresh_jwt_required
def demand_info(demand_id):
    '''获取需求详情

    GET /api/project/demand/<int:demand_id>
    '''
    return jsonify({'msg': 'ok', 'data': demand.demand_detail(demand_id)})


def demand_update():
    '''更新需求信息

    PUT /api/project/demand
    '''

    if not request.json:
        abort(400)
    if demand.find_demand_title_by_id(request.json['id'])==request.json["title"]:
        pass
    elif demand.find_one_demand_by_title(request.json["title"]):
        return jsonify({'msg': '该需求已存在'})
    try:
        data = demand.update_demands(request.json)
        return jsonify({'msg': 'ok', 'data': model_to_dict(data)})
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'})


@fresh_jwt_required
def demand_lists():
    '''获取需求列表

    GET /api/demand/list
    '''
    demand_list = Demand.select().where(Demand.status == 0).dicts().get()
    return list(demand_list)
