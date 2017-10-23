# -*- coding: utf-8 -*-
'''项目管理接口

@author: Wang Qianxiang
'''

from flask import jsonify, request, abort, Blueprint
from model import project
app = Blueprint('project', __name__, url_prefix='/api')  # pylint: disable=c0103


@app.route("/project/<int:project_id>", methods=['GET'])
def project_info():
    '''获取项目信息

    GET /api/project/<int:project_id>
    '''
    return 'developing'


@app.route("/project/<int:project_id>", methods=['PUT'])
def project_update():
    '''更新项目信息

    PUT /api/project/<int:project_id>
    '''
    return 'developing'


@app.route("/userlist", methods=['GET'])
def user_list():
    '''获取所有用户列表

    GET /api/user
    '''
    return jsonify(project.find_users())


@app.route("/project/<int:project_id>/user", methods=['GET'])
def project_user():
    '''获取项目成员
    
    GET /api/project/<int:project_id>/user
    '''
    return 'developing'


@app.route("/project/<int:project_id>/user", methods=['PUT'])
def project_user_update():
    '''更新项目成员
    
    PUT /api/project/<int:project_id>/user
    '''
    return 'developing'
