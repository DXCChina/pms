# -*- coding: utf-8 -*-
'''用户管理操作

@author: Wang Jianhui
'''
import traceback

from model.db import db


def findOneById(userid):
    '''按 id 查询用户'''
    with db.cursor() as cursor:
        sql = "SELECT * FROM user WHERE id=%s"
        cursor.execute(sql, (userid))
        result = cursor.fetchone()
    return result


def findOneByName(username):
    '''按 username 查询用户'''
    with db.cursor() as cursor:
        sql = "SELECT * FROM user WHERE username=%s"
        cursor.execute(sql, (username))
        result = cursor.fetchone()
    return result


def findOneByEmail(email):
    '''按 email 查询用户'''
    with db.cursor() as cursor:
        sql = "SELECT * FROM user WHERE email=%s"
        cursor.execute(sql, (email))
        result = cursor.fetchone()
    return result


def save(user):
    '''添加用户并返回用户信息'''
    with db.cursor() as cursor:
        sql = "INSERT INTO user (username,email,password) VALUES (%s, %s, %s)"
        cursor.execute(sql,
                       (user['username'], user['email'], user['password']))
    db.commit()


def update(user):
    '''更新用户信息'''
    with db.cursor() as cursor:
        sql = "UPDATE user SET username=%s,email = %s WHERE id = %s"
        cursor.execute(sql, (user['username'], user['email'], user['id']))
    db.commit()


def change_password(userid, password):
    '''更新用户密码'''
    with db.cursor() as cursor:
        sql = "UPDATE user SET password=%s WHERE id = %s"
        cursor.execute(sql, (password, userid))
    db.commit()
