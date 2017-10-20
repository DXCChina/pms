# -*- coding: utf-8 -*-
'''用户管理操作

@author: Wang Jianhui
'''

from model.db import db


def findOneById(id):
    '''按 id 查询用户'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT id,username,email FROM user WHERE id=%s"
            cursor.execute(sql, (id))
            result = cursor.fetchone()
    finally:
        return result


def findOneByName(username):
    '''按 username 查询用户'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE username=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
    finally:
        return result


def save(user):
    '''添加用户并返回用户信息'''
    try:
        with db.cursor() as cursor:
            sql = "INSERT INTO user (username,email,password) VALUES (%s, %s, %s)"
            cursor.execute(sql,
                           (user['username'], user['email'], user['password']))
        db.commit()
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE email=%s"
            cursor.execute(sql, (user['email']))
            result = cursor.fetchone()
    finally:
        print('result', result)
        return result


def update(id, user):
    '''更新用户信息'''
    return 'deveping...'
