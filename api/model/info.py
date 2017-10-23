# -*- coding: utf-8 -*-
'''信息展示操作

@author: Gao Le
'''

from model.db import db

def getProjectList():
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM project"
            cursor.execute(sql)
            result = cursor.fetchone()
    finally:
        return result