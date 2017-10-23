# -*- coding: utf-8 -*-
'''信息展示接口

@author: Gao Le
'''

from flask import jsonify, request, abort, Blueprint
from model import info
app = Blueprint('info', __name__, url_prefix='/api')  # pylint: disable=c0103


@app.route("/project", methods=['GET'])
def project_list():
    '''获取所有项目列表

    GET /api/project
    '''
    return jsonify(info.getProjectList())


@app.route("/project", methods=['POST'])
def project_add():
    '''创建新项目

    POST /api/project
    '''
    return 'developing'


@app.route("/task", methods=['GET'])
def task_list():
    '''获取所有任务列表

    GET /api/task
    '''
    return 'developing'
