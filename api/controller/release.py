# -*- coding: utf-8 -*-
'''项目管理接口'''
from flask_jwt_extended import fresh_jwt_required


@fresh_jwt_required
def release_list():
    '''获取项目Release'''
    pass


@fresh_jwt_required
def release_add():
    '''创建Release'''
    pass
