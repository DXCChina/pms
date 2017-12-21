# -*- coding: utf-8 -*-
'''项目管理接口'''
from flask_jwt_extended import fresh_jwt_required
from flask import request
from model.db import Release

@fresh_jwt_required
def release_list():
    '''获取项目Release'''
    result = Release.select().where(Release.projectId == request.args['projectId']).order_by(Release.date.desc())
    return {'message': 'ok', 'data': list(result.dicts())}


@fresh_jwt_required
def release_add():
    '''创建Release'''

    confirm = Release.select().where(Release.title == request.json['title'])
    if len(list(confirm.dicts())) > 0:
        result = {'message': '名称重复', 'data': []}
    else:
        Release.create(
            title=request.json['title'],
            content=request.json['content'],
            projectId=request.json['projectId']
        )
        search = Release.select().where(Release.title == request.json['title'])
        result = {'message': 'ok', 'data': list(search.dicts())}
    return result

@fresh_jwt_required
def release_delete(release_id):
    '''删除Release'''

    confirm = Release.delete().where(Release.id == release_id)
    confirm.execute()
    search = Release.select().where(Release.id == release_id)
    if len(list(search.dicts())) == 0:
        result = {'message': 'ok', 'data': list(search.dicts())}
    else:
        result = {'message': 'error', 'data': list(search.dicts())}
    return result