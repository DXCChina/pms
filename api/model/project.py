# -*- coding: utf-8 -*-
'''项目管理操作

@author: Wang Qianxiang
'''

from .db import db
from .role import identity
from .db import Project
from playhouse.shortcuts import model_to_dict, dict_to_model

def find_project(project_id):
    '''查询项目信息'''
    with db.cursor() as cursor:
        sql = "SELECT * FROM project WHERE id=%s"
        cursor.execute(sql, (project_id))
        result = cursor.fetchone()
    return result


@identity.check_permission("update", 'project')
def update_project(project_id, request):
    '''更新项目信息'''
    print(request, project_id)
    query = Project.update(
                 name = request['name'],
                 detail = request['detail'],
                 type = request['type'],
                 status = request['status'],
                 startDate = request['startDate'],
                 endDate = request['endDate']).where(Project.id == project_id)
    query.execute()
    result = Project.select().where(Project.id == project_id)
    return list(result.dicts())


def find_users():
    '''查询所有用户列表'''
    with db.cursor() as cursor:
        sql = "SELECT id, username, email FROM user WHERE status='active'"
        cursor.execute(sql)
        result = cursor.fetchall()
    return result


def find_project_users(project_id):
    '''查询项目用户列表 '''
    with db.cursor() as cursor:
        # sql = "SELECT projectmember.projectId, projectmember.memberId, user.username \
        # FROM projectmember INNER JOIN user \
        # ON projectmember.memberId=user.id \
        # WHERE projectmember.projectId=%s AND user.status='active'"
        sql = "select u.id, u.username, u.email, pm.role from `user` as u \
               left join `project_member` as pm on u.id = pm.memberId where pm.projectId = %s AND u.status='active';"
        cursor.execute(sql, (project_id))
        result = cursor.fetchall()
    return result


@identity.check_permission("update", 'project')
def update_project_users(project_id, request):
    '''更新项目成员'''
    with db.cursor() as cursor:
        try:
            sql = "DELETE FROM projectmember WHERE projectId=%s"
            cursor.execute(sql, (project_id))

            sql = "INSERT INTO projectmember (projectId,memberId) VALUES (%s, %s)"
            cursor.executemany(
                sql,
                tuple(
                    (project_id, member) for member in request['memberIdArr']))
            db.commit()
        except:
            db.rollback()
    return find_project_users(project_id)
