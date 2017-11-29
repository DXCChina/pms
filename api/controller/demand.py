# -*- coding: utf-8 -*-
'''需求管理接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint, session
from model import demand

from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
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


# @app.route("/project/<int:project_id>/demand", methods=['POST'])
# @app.route("/project/demand", methods=['POST'])
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


# @app.route("/project/demand/detail/<int:demand_id>", methods=['GET'])
@fresh_jwt_required
def demand_info(demand_id):
    '''获取需求详情

    GET /api/project/demand/detail/<int:demand_id>
    '''
    return jsonify({'msg': 'ok', 'data': demand.demand_detail(demand_id)})


# @app.route("/project/<int:project_id>/demand/<int:demand_id>", methods=['PUT'])
# @app.route("/project/demand/update", methods=['PUT'])
# @fresh_jwt_required
def demand_update():
    '''更新需求信息

    PUT /api/project/demand/update
    '''

    if not request.json:
        abort(400)
    if demand.find_one_demand_by_title(request.json["title"]):
        return jsonify({'msg': '该需求已存在'})
    try:
        data = demand.update_demands(request.json)
        return jsonify({'msg': 'ok', 'data': data})
    except PermissionDenied:
        return jsonify({'msg': 'PermissionDenied'})


def find_demand_list_match_str(title):
    '''模糊查询需求列表

    GET /api/project/demand/<str:title>
    '''

    return jsonify({
        'msg': 'ok',
        'data': list(demand.find_demand_list_match_str(title))
    })
