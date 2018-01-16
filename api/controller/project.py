# -*- coding: utf-8 -*-
'''项目管理接口

@author: Wang Qianxiang
'''
from flask_jwt_extended import fresh_jwt_required, get_jwt_identity
from marshmallow import Schema, fields
from flask import jsonify, request, abort, Blueprint, session
from playhouse.shortcuts import model_to_dict
from model.db import Project

from model import project
# pylint: disable=c0103

app = Blueprint('project', __name__, url_prefix='/api')


class projectNewSchema(Schema):
    '''项目新建信息'''
    name = fields.String(required=True)
    detail = fields.String(required=False)
    startDate = fields.DateTime(required=True)
    endDate = fields.DateTime(required=True)
    type = fields.String(required=True)


def find_one_project_by_name(project_name):
    return Project.sfind().where((Project.name == project_name) &
                                 (Project.status == "active"))


@fresh_jwt_required
def project_list():
    '''获取所有项目列表

    GET /api/project
    '''
    return jsonify(project.project_list(get_jwt_identity()))


@fresh_jwt_required
def project_add():
    '''创建新项目

    POST /api/project
    '''
    if not request.json or\
        not 'name' in request.json:
        return jsonify({"msg": "Missing json in request"}), 400

    schema = projectNewSchema()
    data, errors = schema.load(request.json)
    # print(data, errors)
    if errors:
        return jsonify({"msg": errors}), 400
    if find_one_project_by_name(data["name"]):
        return jsonify({"msg": "项目名称重复"}), 200

    if 'user_id' in session:
        data['ownerId'] = session['user_id']

    return project.project_add(data), 201


@fresh_jwt_required
def project_info(project_id):
    '''获取项目信息

    GET /api/project/<int:project_id>
    '''
    return project.find_project(project_id)


@fresh_jwt_required
def project_update(project_id):
    '''更新项目信息

    PUT /api/project/<int:project_id>
    '''
    if not request.json or\
    not 'name' in request.json or\
    not 'detail' in request.json:
        abort(400)
    session['project_id'] = project_id
    # try:
    return {
        "message": "项目更新成功",
        "data": project.update_project(project_id, request.json)
    }


@fresh_jwt_required
def project_user(project_id):
    '''获取项目成员
    
    GET /api/project/<int:project_id>/user
    '''
    return jsonify({
        "message": "ok",
        "data": project.find_project_users(project_id)
    })


@fresh_jwt_required
def fuzzy_query_member():
    '''模糊查询用户'''
    return {
        "message": "ok",
        "data": project.fuzzy_query(request.args.to_dict())
    }


@fresh_jwt_required
def project_member_add():
    '''添加项目成员'''
    return {"message": "ok", "data": project.member_add(request.json)}


@fresh_jwt_required
def project_member_delete():
    '''删除项目成员'''
    return {
        "message": "ok",
        "data": project.member_delete(request.args.to_dict())
    }
