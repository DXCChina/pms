# -*- coding: utf-8 -*-
'''用户管理操作

@author: Wang Jianhui
'''

from peewee import *
from model.db import MySQLModel
from datetime import datetime


class User(MySQLModel):
    createat = DateTimeField(db_column='createAt', default=datetime.now)
    email = FixedCharField(unique=True)
    password = FixedCharField(max_length=100)
    status = FixedCharField(default='active')
    username = FixedCharField(unique=True)

    class Meta:
        db_table = 'user'


def findOneById(userid):
    '''按 id 查询用户'''
    return User.getOne(User.id == userid)


def findOneByName(username):
    '''按 username 查询用户'''
    return User.getOne(User.username == username)


def findOneByEmail(email):
    '''按 email 查询用户'''
    return User.getOne(User.email == email)


def save(user):
    '''添加用户并返回用户信息'''
    User.create(
        username=user['username'],
        email=user['email'],
        password=user['password'])


def update(user):
    '''更新用户信息'''
    User.update(
        username=user['username'],
        email=user['email']).where(User.id == user['id'])


def change_password(userid, password):
    '''更新用户密码'''
    User.update(password=password).where(User.id == userid)
