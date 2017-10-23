# -*- coding: utf-8 -*-
'''信息展示操作

@author: Gao Le
'''

from model.db import db

def project_list():
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM project"
            cursor.execute(sql)
            result = cursor.fetchone()
    finally:
        return result

def task_list():
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM task"
            cursor.execute(sql)
            result = cursor.fetchall()
    finally:
        return result