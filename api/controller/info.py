# -*- coding: utf-8 -*-
'''信息展示接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint, make_response
from model import info
app = Blueprint('info', __name__, url_prefix='/api')  # pylint: disable=c0103


@app.route("/project", methods=['GET'])
def project_list():
    '''获取所有项目列表

    GET /api/project
    '''
    return make_response(jsonify(message="success", data=info.project_list(), status=200), 200)
    # return jsonify(info.project_list())


@app.route("/project", methods=['POST'])
def project_add():
    '''创建新项目

    POST /api/project
    '''
    if not request.json or\
        not 'name' in request.json or\
        not 'detail' in request.json:
        abort(400)
    # return make_response(jsonify(message="success", data=info.project_add(request.json), status=201), 201)
    return info.project_add(request.json)


@app.route("/task", methods=['GET'])
def task_list():
    '''获取所有任务列表

    GET /api/task
    '''
    return make_response(jsonify(message="success", data=info.task_list(), status=200), 200)
    # return info.task_list()
