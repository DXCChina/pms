# -*- coding: utf-8 -*-
'''需求,任务管理操作

@author: Xing Dong
'''
from flask import jsonify
from .db import Demand
from .role import identity


# @identity.check_permission("create", 'demand')
def createDemand(demand):
    '''新建需求'''
    Demand.create(
        title=demand['title'],
        detail=demand['detail'],
        level=demand['level'],
        projectId=demand['projectId'],
        activityId=demand['activityId'],
        status=demand['status'],
    )

    return Demand.getOne(Demand.id == Demand.select().count())


def demandDetail(demandId):
    '''获取需求详情'''
    return Demand.getOne(Demand.id == demandId)


# @identity.check_permission("update", 'demand')
def update_demands(demand):
    Demand.update(
        title=demand['title'],
        detail=demand['detail'],
        level=demand['level'],
        status=demand['status']).where(Demand.id == demand['id']).execute()
    return Demand.getOne(Demand.id == demand['id'])


def demand_list():
    '''获取需求列表'''
    return Demand.select().where(Demand.status == 0).dicts().get()

# def createDemand(demand):
#   '''新建需求'''
# with db.cursor() as cursor:
# sql = "INSERT INTO demand (ownerId, projectId, title, detail, level, status, startDate, endDate, progress, cost) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
# cursor.execute(sql, (
# demand['ownerId'],
# demand['projectId'],
# demand['title'],
# demand['detail'],
# demand['level'],
# demand['status'],
# demand['startDate'],
# demand['endDate'],
# demand['progress'],
# demand['cost'],
# ))
# db.commit()
# with db.cursor() as cursor:
# sql = "SELECT * FROM demand WHERE title=%s"
# cursor.execute(sql, (demand['title']))
# result = cursor.fetchone()
# return result


# def findDemandTitle(title):
#     '''查询需求标题'''
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM `demand` WHERE `title`=%s"
#         cursor.execute(sql, (title))
#         result = cursor.fetchone()
#     return result


# def findMember(projectId):
#     '''按照项目ID查询成员'''
#     with db.cursor() as cursor:
#         sql = "SELECT u.username, p.memberId FROM `projectmember` as p LEFT JOIN `user` as u ON p.memberId = u.id WHERE p.projectId=%s"
#         cursor.execute(sql, (projectId))
#         result = cursor.fetchall()
#     return result

# @identity.check_permission("update", 'demand')
# def updateDemands(params):
#     '''更新需求'''
#     with db.cursor() as cursor:
#         sql = "UPDATE demand SET `status`=%s, `level`=%s, `endDate`=%s, `title`=%s, `detail`=%s, `progress`=%s, `cost`=%s  WHERE `id`=%s"
#         cursor.executemany(sql, params)
#         db.commit()
#     return jsonify({"message": "ok" if bool(cursor.rowcount > 0) else ""})

# # def demandDetail(demandId):
# #     '''获取需求详情'''
# #     with db.cursor() as cursor:
# #         sql = "SELECT * FROM demand WHERE `Id`=%s"
# #         cursor.execute(sql, (demandId))
# #         result = cursor.fetchone()
# #     return result

# def demandSearch(title):
#     '''模糊查询需求'''
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM demand WHERE `status`!='delete' AND `title` LIKE %s"
#         cursor.execute(sql, ('%' + title + '%'))
#         result = cursor.fetchall()
#     return result

# @identity.check_permission("create", 'task')
# def createTask(task):
#     '''新建任务'''
#     with db.cursor() as cursor:
#         sql = "INSERT INTO task (ownerId, memberId, demandId, title, detail, level, status, startDate, endDate, progress, cost) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
#         cursor.execute(sql, (task['ownerId'], task['memberId'],
#                              task['demandId'], task['title'], task['detail'],
#                              task['level'], task['status'], task['startDate'],
#                              task['endDate'], task['progress'], task['cost']))
#         db.commit()
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM task WHERE title=%s"
#         cursor.execute(sql, (task['title']))
#         result = cursor.fetchone()
#     return result

# def taskList(args):
#     '''任务列表查询'''
#     with db.cursor() as cursor:
#         sql = "SELECT * FROM `task` WHERE (`ownerId`=%s OR `memberId`=%s) AND `demandId`=%s AND status!='delete'"
#         cursor.execute(sql,
#                        (args['ownerId'], args['ownerId'], args['demandId']))
#         data = cursor.fetchall()
#     return {"data": data, "total": len(data)}

# @identity.check_permission("update", 'task')
# def updateTask(task):
#     '''任务信息更新'''
#     with db.cursor() as cursor:
#         sql = "UPDATE task SET `status`=%s, `memberId`=%s, `level`=%s, `endDate`=%s, `title`=%s, `detail`=%s, `progress`=%s, `cost`=%s  WHERE `id`=%s"
#         cursor.execute(sql, (task["status"], task['memberId'], task["level"],
#                              task["endDate"], task["title"], task["detail"],
#                              task["progress"], task["cost"], task["id"]))
#         db.commit()
#     return jsonify({"message": "ok" if bool(cursor.rowcount > 0) else ""})