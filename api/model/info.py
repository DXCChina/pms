# -*- coding: utf-8 -*-
'''信息展示操作

@author: Gao Le
'''

from model.db import db
from flask import session, make_response, jsonify
import time

STATUS = 'active'


def project_list():
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM project"
            cursor.execute(sql)
            result = cursor.fetchall()
    finally:
        return result


def project_add(project):
    if 'user_id' in session:
        owner_id = session['user_id']

    try:
        with db.cursor() as cursor:
            sql = "INSERT INTO project (name,detail,ownerId,status) VALUE (%s, %s, %s, %s)"
            cursor.execute(
                sql, (project['name'], project['detail'], owner_id, STATUS))
            db.commit()

        with db.cursor() as cursor:
            sql = "SELECT * FROM project WHERE name=%s"
            cursor.execute(sql, (project['name']))
            result = cursor.fetchone()
    finally:
        return result


def task_list():
    try:
        with db.cursor() as cursor:
            sql = "SELECT t.id, t.title, t.detail, t.status,t.level,u.username AS ownerName, m.username AS memberName,t.createAt FROM task t " \
                  "LEFT JOIN user u ON  t.ownerId=u.id LEFT JOIN user m ON  t.memberId=m.id"
            cursor.execute(sql)
            result = cursor.fetchall()
    finally:
        return result


def find_one_project_by_name(name):
    with db.cursor() as cursor:
        sql = "SELECT * FROM project WHERE name=%s"
        cursor.execute(sql, (name))
        result = cursor.fetchone()
    return result