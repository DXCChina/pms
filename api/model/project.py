# -*- coding: utf-8 -*-
'''项目管理操作

@author: Wang Qianxiang
'''

from model.db import db


def find_project(project_id):
    '''查询项目信息'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM project WHERE id=%s"
            cursor.execute(sql, (project_id))
            result = cursor.fetchone()
    finally:
        return result

def update_project(project_id, request):
    '''更新项目信息'''
    try:
        with db.cursor() as cursor:
            sql = "UPDATE project SET name=%s, detail=%s, ownerId=%s, status=%s WHERE id=%s"
            cursor.execute(sql, (str(request['name']), str(request['detail']), int(request['ownerId']), str(request['status']), project_id))

        db.commit()
    finally:
        return find_project(project_id)

def find_users():
    '''查询所有用户列表'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE status='active'"
            cursor.execute(sql)
            result = cursor.fetchall()
    finally:
        return result

def find_project_users(project_id):
    '''查询项目用户列表'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT projectmember.projectId, projectmember.memberId, user.username \
            FROM projectmember INNER JOIN user \
            ON projectmember.memberId=user.id \
            WHERE projectmember.projectId=%s AND user.status='active'"
            cursor.execute(sql, (project_id))
            result = cursor.fetchall()
    finally:
        return result

def update_project_users(project_id, request):
    '''更新项目成员'''
    try:
        with db.cursor() as cursor:
            try:
                sql = "DELETE FROM projectmember WHERE projectId=%s"
                cursor.execute(sql, (project_id))

                sql = "INSERT INTO projectmember (id,projectId,memberId) VALUES (%s, %s, %s)"
                cursor.executemany(sql, tuple((1, project_id, member) for member in request['memberIdArr']))
                db.commit()                    
            except:
                db.rollback()
    finally:
        return find_project_users(project_id)
