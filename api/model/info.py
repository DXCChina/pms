# -*- coding: utf-8 -*-
'''信息展示操作

@author: Gao Le
'''

# from model.db import db
#
# STATUS = 'active'
#
#
# def project_list():
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM project"
#         cursor.execute(sql)
#         data = cursor.fetchall()
#
#     return {'data': data, 'total': len(data)}
#
#
# def project_add(project):
#     with db.cursor() as cursor:
#         sql = "INSERT INTO project (name,detail,ownerId,status) VALUE (%s, %s, %s, %s)"
#         cursor.execute(
#             sql,
#             (project['name'], project['detail'], project['user_id'], STATUS))
#         db.commit()
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM project WHERE name=%s"
#         cursor.execute(sql, (project['name']))
#         result = cursor.fetchone()
#
#     return result
#
#
# def task_list():
#     with db.cursor() as cursor:
#         sql = "SELECT t.id, t.title, t.detail, t.status,t.level,u.username AS ownerName, m.username AS memberName,t.createAt FROM task t " \
#         "LEFT JOIN user u ON  t.ownerId=u.id LEFT JOIN user m ON  t.memberId=m.id"
#         cursor.execute(sql)
#         data = cursor.fetchall()
#
#     return {'data': data, 'total': len(data)}
#
#
# def find_one_project_by_name(name):
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM project WHERE name=%s"
#         cursor.execute(sql, (name))
#         result = cursor.fetchone()
#
#     return result

from model.db import db

from .db import Project
from .db import ProjectMember
from peewee import SQL
from playhouse.shortcuts import model_to_dict, dict_to_model

def project_add(project):
    result = Project.create(
                name=project['name'],
                detail=project['detail'],
                ownerId=project['ownerId'],
                startDate=project['startDate'],
                endDate=project['endDate'],
                type=project['type']
            )
    return model_to_dict(Project.get(Project.name == project['name']))

def find_one_project_by_name(project_name):
    return model_to_dict(Project.get(Project.name == project_name))

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
        ).where(Project.ownerId == ownerId & Project.status == 'active')
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
    print(result)
    return {'data': result, 'total': len(result)}