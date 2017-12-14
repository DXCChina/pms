# -*- coding: utf-8 -*-
'''项目管理操作

@author: Wang Qianxiang
'''

from .db import db
from .role import identity
from .db import Project
from .db import User
from .db import ProjectMember
from peewee import SQL
from playhouse.shortcuts import model_to_dict, dict_to_model

def find_project(project_id):
    '''查询项目信息'''
    result = Project.select(
        Project,
        User.username,
        User.email,
        SQL(" 'pm' AS 'role' ")
    ).join(User, on=(Project.ownerId == User.id)).where(Project.id == project_id)
    return list(result.dicts())[0]

@identity.check_permission("update", 'project')
def update_project(project_id, request):
    '''更新项目信息'''
    # print(request, project_id)
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
    query = User.select(ProjectMember.id, User.username, User.email, ProjectMember.role, ProjectMember.projectId)\
                .join(ProjectMember, on=(User.id == ProjectMember.memberId)).where(User.status == 'active' and ProjectMember.projectId == project_id)
    return list(query.dicts())


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

def fuzzy_query(query):
    '''模糊查询人员'''
    name = '%' + query['name'] +'%'
    query = User.select().where(User.username % name)
    return list(query.dicts())


def member_add(request):
    '''添加成员'''
    ProjectMember.create(
        memberId=request['id'],
        projectId=request['projectId'],
        role=request['role']
    )
    result = ProjectMember.select().where(ProjectMember.projectId == request['projectId'])
    return list(result.dicts())

def member_delete(query):
    '''删除人员'''
    result = ProjectMember.delete().where(ProjectMember.id == query['id'])
    result.execute()
    # print(result)
    return None

def project_add(project):
    print('$$$$$$$$$$$$$model:add')
    result = Project.create(
                name=project['name'],
                detail=project['detail'],
                ownerId=project['ownerId'],
                startDate=project['startDate'],
                endDate=project['endDate'],
                type=project['type']
            )
    return model_to_dict(Project.get(Project.name == project['name']))

def project_list(ownerId):
    # db.commit()
    # with db.cursor() as cursor:
    #     sql = "select tab.* from ( (select p.*, 'pm' as role from `project` as p where p.ownerId=%s AND p.status='active') \
    #           union (select p.*, pm.role from `project` as p left join `project_member` as pm on p.id = pm.projectId where pm.memberId=%s) ) as tab"
    #     cursor.execute(sql, (ownerId, ownerId))
    #     data = cursor.fetchall()
    result = (
        Project.select(
            Project.name,
            Project.id,
            Project.detail,
            Project.status,
            Project.startDate,
            Project.endDate,
            Project.ownerId,
            Project.createAt,
            Project.type,
            SQL(" 'pm' As 'role' ")
        ).where((Project.status == "active") & (Project.ownerId == ownerId))
        |
        Project.select(
            Project.name,
            Project.id,
            Project.detail,
            Project.status,
            Project.startDate,
            Project.endDate,
            Project.ownerId,
            Project.createAt,
            Project.type,
            ProjectMember.role
        ).join(ProjectMember, on=(Project.id == ProjectMember.projectId)).where(ProjectMember.memberId == ownerId)
    )
    result = list(result.dicts())
    return {'data': result, 'total': len(result)}
