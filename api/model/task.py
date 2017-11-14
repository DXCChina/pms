# -*- coding: utf-8 -*-
'''需求,任务管理操作

@author: Xing Dong
'''
from flask import request, jsonify
from model.db import db
import traceback
def createDemand(demand):
    '''新建需求'''
    try:
        with db.cursor() as cursor:
            sql = "INSERT INTO demand (ownerId, projectId, title, detail, level, status, startDate, endDate, progress, cost) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            cursor.execute(sql, (demand['ownerId'], demand['projectId'], demand['title'], demand['detail'],
                                 demand['level'], demand['status'], demand['startDate'], demand['endDate'],
                                 demand['progress'], demand['cost'],))
            db.commit()
        with db.cursor() as cursor:
            sql = "SELECT * FROM demand WHERE title=%s"
            cursor.execute(sql, (demand['title']))
            result = cursor.fetchone()
    finally:
        return result

def findDemandTitle(title):
    '''查询需求标题'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM `demand` WHERE `title`=%s"
            cursor.execute(sql, (title))
            result = cursor.fetchone()
    finally:
        return result

def findMember(projectId):
    '''按照项目ID查询成员'''
    print(projectId)
    try:
        with db.cursor() as cursor:
            sql = "SELECT u.username, p.memberId FROM `projectmember` as p LEFT JOIN `user` as u ON p.memberId = u.id WHERE p.projectId=%s"
            cursor.execute(sql, (projectId))
            result = cursor.fetchall()
    finally:
        return result


def demandList(args):
        '''获取需求列表'''
        try:
            with db.cursor() as cursor:
                sql = "SELECT * FROM `demand` WHERE `ownerID`=%s AND `projectId`=%s AND status!='delete' ORDER BY %s %s LIMIT %s, %s" % (args['ownerId'], args['projectId'], args['sortField'], args['sortOrder'], (int(args['page']) - 1) * int(args['size']) , int(args['page']) * int(args['size']))
                cursor.execute(sql)
                data = cursor.fetchall()

            with db.cursor() as cursor:
                sql = "SELECT * FROM `demand` WHERE `ownerId`=%s AND `projectId`=%s AND status!='delete'"
                cursor.execute(sql, (args['ownerId'], args['projectId']))
                total= len(cursor.fetchall())

        finally:
            return {"data": data, "total": total}

def updateDemands(params):
        '''更新需求'''
        try:
            with db.cursor() as cursor:
                sql = "UPDATE demand SET `status`=%s, `level`=%s, `endDate`=%s, `title`=%s, `detail`=%s, `progress`=%s, `cost`=%s  WHERE `id`=%s"
                cursor.executemany(sql, params)
                db.commit()
        finally:
            return jsonify({"message": "ok" if bool(cursor.rowcount > 0) else "" })

def demandDetail(demandId):
        '''获取需求详情'''
        try:
            with db.cursor() as cursor:
                sql = "SELECT * FROM demand WHERE `Id`=%s"
                cursor.execute(sql, (demandId))
                result = cursor.fetchone()
        finally:
            return result

def demandSearch(title):
        '''模糊查询需求'''
        try:
            with db.cursor() as cursor:
                sql = "SELECT * FROM demand WHERE `status`!='delete' AND `title` LIKE %s"
                cursor.execute(sql, ('%'+title+'%'))
                result = cursor.fetchall()
        finally:
            return result

def createTask(task):
        '''新建任务'''
        try:
            with db.cursor() as cursor:
                sql = "INSERT INTO task (ownerId, memberId, demandId, title, detail, level, status, startDate, endDate, progress, cost) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                cursor.execute(sql, (task['ownerId'], task['memberId'], task['demandId'], task['title'], task['detail'],
                                     task['level'], task['status'], task['startDate'], task['endDate'],
                                     task['progress'], task['cost']))
                db.commit()
            with db.cursor() as cursor:
                sql = "SELECT * FROM task WHERE title=%s"
                cursor.execute(sql, (task['title']))
                result = cursor.fetchone()
        finally:
            return result


def taskList(args):
    '''任务列表查询'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM `task` WHERE `ownerId`=%s AND `memberId`=%s AND `demandId`=%s AND status!='delete'"
            cursor.execute(sql, (args['ownerId'], args['memberId'], args['demandId']))
            data = cursor.fetchall()

        with db.cursor() as cursor:
            sql = "SELECT * FROM `task` WHERE `ownerId`=%s AND `memberId`=%s  AND `demandId`=%s AND status!='delete'"
            cursor.execute(sql, (args['ownerId'], args['memberId'], args['demandId']))
            total = len(cursor.fetchall())

    finally:
        return {"data": data, "total": total}

def updateTask(task):
    '''任务信息更新'''
    try:
        with db.cursor() as cursor:
            sql = "UPDATE task SET `status`=%s, `level`=%s, `endDate`=%s, `title`=%s, `detail`=%s, `progress`=%s, `cost`=%s  WHERE `id`=%s"
            cursor.execute(sql, (task["status"], task["level"], task["endDate"], task["title"], task["detail"], task["progress"], task["cost"], task["id"]))
            db.commit()
    finally:
        return jsonify({"message": "ok" if bool(cursor.rowcount > 0) else ""})