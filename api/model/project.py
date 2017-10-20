# -*- coding: utf-8 -*-
'''项目管理操作

@author: Wang Qianxiang
'''

from model.db import db


def find_users():
    '''查询所有用户列表'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user"
            cursor.execute(sql)
            result = cursor.fetchall()
    finally:
        return result
