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
                sql = "SELECT * FROM `demand` WHERE `ownerID`=%s AND `projectId`=%s ORDER BY %s %s LIMIT %s, %s" % (args['ownerId'], args['projectId'], args['sortField'], args['sortOrder'], int(args['page'])-1, int(args['page']) * int(args['size']))
                cursor.execute(sql)
                result = cursor.fetchall()
        finally:
            return result