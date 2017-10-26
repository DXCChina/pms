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
            sql = "SELECT title FROM demand WHERE title=%s"
            cursor.execute(sql, (demand['title']))
            result = cursor.fetchone()
            if result == None:
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
               finally:
                   result = cursor.fetchone()
            else:
                result = {'errMsg': 'Title already exists'}
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
        print(params)
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
                sql = "SELECT * FROM demand WHERE `title` LIKE %s"
                cursor.execute(sql, ('%'+title+'%'))
                result = cursor.fetchall()
                print(result)
        finally:
            return result

def createTask(task):
        '''新建任务'''
        try:
            with db.cursor() as cursor:
                sql = "SELECT title FROM task WHERE title=%s"
                cursor.execute(sql, (task['title']))
                result = cursor.fetchone()
                if result == None:
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
                    finally:
                        result = cursor.fetchone()
                else:
                    result = {'errMsg': 'Title already exists'}
        finally:
            return result