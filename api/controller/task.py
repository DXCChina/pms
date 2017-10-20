# -*- coding: utf-8 -*-
'''需求,任务管理接口

@author: Xing Dong
'''

from flask import jsonify, request, abort, Blueprint
from model import task
app = Blueprint('task', __name__, url_prefix='/api')  # pylint: disable=c0103


@app.route("/project/<int:project_id>/demand", methods=['GET'])
def demand_list(project_id):
    '''获取指定项目需求列表

    GET /api/project/<int:project_id>/demand
    '''
    return 'developing'


@app.route("/project/<int:project_id>/demand", methods=['POST'])
def demand_add(project_id):
    '''添加需求

    POST /api/project/<int:project_id>/demand
    '''
    return 'developing'


@app.route("/project/<int:project_id>/demand/<int:demand_id>", methods=['GET'])
def demand_info(project_id, demand_id):
    '''获取需求详情

    GET /api/project/<int:project_id>/demand/<int:demand_id>
    '''
    return 'developing'


@app.route("/project/<int:project_id>/demand/<int:demand_id>", methods=['PUT'])
def demand_update(project_id, demand_id):
    '''更新需求信息

    PUT /api/project/<int:project_id>/demand/<int:demand_id>
    '''
    return 'developing'


@app.route("/demand/<int:demand_id>/task", methods=['GET'])
def task_list(demand_id):
    '''获取需求任务列表

    GET /api/demand/<int:demand_id>/task
    '''
    return 'developing'


@app.route("/demand/<int:demand_id>/task", methods=['POST'])
def task_add(demand_id):
    '''添加任务

    POST /api/demand/<int:demand_id>/task
    '''
    return 'developing'


@app.route("/demand/<int:demand_id>/task/<int:task_id>", methods=['GET'])
def task_info(demand_id, task_id):
    '''获取任务详情

    GET /api/demand/<int:demand_id>/task/<int:task_id>
    '''
    return 'developing'


@app.route("/demand/<int:demand_id>/task/<int:task_id>", methods=['PUT'])
def task_update(demand_id, task_id):
    '''更新指定任务信息

    PUT /api/demand/<int:demand_id>/task/<int:task_id>
    '''
    return 'developing'
