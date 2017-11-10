# -*- coding: utf-8 -*-
'''需求,任务管理接口

@author: Xing Dong
'''

from flask import jsonify, request, abort, Blueprint
from model import task

from flask_jwt_extended import (create_access_token, get_jwt_identity,
                                get_jwt_claims, fresh_jwt_required,
                                set_access_cookies, unset_jwt_cookies)
from marshmallow import Schema, fields

app = Blueprint('task', __name__, url_prefix='/api')  # pylint: disable=c0103

class DemandSchema(Schema):
    '''注册信息'''
    ownerId = fields.Number(required=True)
    projectId = fields.Number(required=True)
    progress = fields.Number(required=True)
    cost = fields.Number(required=True)
    title = fields.String(required=True)
    detail = fields.String(required=True)
    level = fields.String(required=True)
    status = fields.String(required=True)
    startDate = fields.String(required=True)
    endDate = fields.String(required=True)

class TaskSchema(Schema):
    '''注册信息'''
    ownerId = fields.Number(required=True)
    memberId = fields.Number(required=True)
    demandId = fields.Number(required=True)
    progress = fields.Number(required=True)
    cost = fields.Number(required=True)
    title = fields.String(required=True)
    detail = fields.String(required=True)
    level = fields.String(required=True)
    status = fields.String(required=True)
    startDate = fields.String(required=True)
    endDate = fields.String(required=True)

@app.route("/project/<int:project_id>/demand", methods=['GET'])
@fresh_jwt_required
def demand_list(project_id):
    '''获取指定项目需求列表

    GET /api/project/<int:project_id>/demand
    '''
    return 'developing'


# @app.route("/project/<int:project_id>/demand", methods=['POST'])
@app.route("/project/demand", methods=['POST'])
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
    if task.findDemandTitle(data['title']):
        return jsonify({"msg": {'title': '主题已存在'}}), 400

    # if not request.json or\
    #     not 'title' in request.json or\
    #     not 'ownerId' in request.json or\
    #     not 'level' in request.json:
    #     print(request.json)
    #     abort(400)

    return handleData(task.createDemand(request.json))


@app.route("/project/demand/detail/<int:demand_id>", methods=['GET'])
@fresh_jwt_required
def demand_info(demand_id):
    '''获取需求详情

    GET /api/project/demand/detail/<int:demand_id>
    '''
    return handleData(task.demandDetail(demand_id))

# @app.route("/project/<int:project_id>/demand/<int:demand_id>", methods=['PUT'])
@app.route("/project/demand/update", methods=['PUT'])
@fresh_jwt_required
def demand_update():
    '''更新需求信息

    PUT /api/project/demand/update
    '''
    if not request.json or not 'data' in request.json:
        print('request:', request.json)
        abort(400)

    params = []
    for item in request.json["data"]:
        params.append(
            (item['status'], item['level'], item['endDate'],item['title'], item['detail'], item['progress'], item['cost'], item['id'])
        )

    return task.updateDemands(tuple(params))


@app.route("/demand/<string:demand_title>", methods=['GET'])
@fresh_jwt_required
def demand_search(demand_title):
    '''模糊查询需求

    GET /api/demand/demand_title
    '''
    res = {
        "message": "ok",
        "data": {}
    }

    if task.demandSearch(demand_title) != None:
        res["data"] = task.demandSearch(demand_title)


    return jsonify(res)

# @app.route("/demand/<int:demand_id>/task", methods=['GET'])
@app.route("/demand/list", methods=['GET'])
@fresh_jwt_required
def demand_lists():
    '''获取需求列表

    GET /api/demand/list
    # '''
    return jsonify({
        "message": "ok",
        "data": task.demandList(request.args.to_dict())["data"],
        "total": task.demandList(request.args.to_dict())["total"]
    })

@app.route("/task/list", methods=['GET'])
@fresh_jwt_required
def task_list():
    '''获取任务列表

    GET /api/task/list
    # '''
    print(request.args.to_dict())
    return jsonify({
        "message": "ok",
        "data": task.taskList(request.args.to_dict())["data"],
        "total": task.taskList(request.args.to_dict())["total"]
    })

# @app.route("/demand/<int:demand_id>/task", methods=['POST'])
@app.route("/demand/task", methods=['POST'])
@fresh_jwt_required
def task_add():
    '''添加任务

    POST /api/demand/task
    '''
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    schema = TaskSchema()
    data, errors = schema.load(request.json)
    if errors:
        return jsonify({"msg": errors}), 400

    # if not request.json or\
    #     not 'title' in request.json or\
    #     not 'ownerId' in request.json or\
    #     not 'level' in request.json:
    #     print(request.json)
    #     abort(400)

    return handleData(task.createTask(request.json))


@app.route("/member/<int:projectId>", methods=["GET"])
@fresh_jwt_required
def getMemberInfo(projectId):
    '''获取成员信息

    GET /api/member/<int:projectId>
    '''
    print(projectId)
    res = {
        "message": "ok",
        "data": {}
    }

    print(task.findMember(projectId))
    if task.findMember(projectId) != None:
        res["data"] = task.findMember(projectId)

    return jsonify(res)

@app.route("/demand/task/update", methods=["PUT"])
@fresh_jwt_required
def update_task():
    '''更新、删除任务

    GET /api/demand/task/update
    '''
    if not request.json or not 'data' in request.json:
        print('request:', request.json)
        abort(400)

    return task.updateTask(request.json["data"])


@app.route("/demand/<int:demand_id>/task/<int:task_id>", methods=['GET'])
@fresh_jwt_required
def task_info(demand_id, task_id):
    '''获取任务详情

    GET /api/demand/<int:demand_id>/task/<int:task_id>
    '''
    return 'developing'


@app.route("/demand/<int:demand_id>/task/<int:task_id>", methods=['PUT'])
@fresh_jwt_required
def task_update(demand_id, task_id):
    '''更新指定任务信息

    PUT /api/demand/<int:demand_id>/task/<int:task_id>
    '''
    return 'developing'


def handleData(data):
    res = {
        "message": "",
        "data": {}
    }
    if data == None:
        res["message"] = "Missing data"
        res["data"] = {}
    elif 'errMsg' in data:
        res['message'] = data['errMsg']
        res["data"] = {}
    else:
        res["message"] = "ok"
        res["data"] = data

    return jsonify(res)