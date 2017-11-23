# -*- coding: utf-8 -*-
'''用户管理操作

@author: Wang Jianhui
'''

from peewee import DateTimeField, FixedCharField, IntegerField, SQL
from model.db import MySQLModel


#用户表
class User(MySQLModel):
    id = IntegerField(primary_key=True, constraints=[SQL('AUTO_INCREMENT')])
    username = FixedCharField(unique=True, max_length=50)
    password = FixedCharField(max_length=100)
    email = FixedCharField(unique=True, max_length=50)
    status = FixedCharField(
        max_length=50,
        constraints=[
            SQL(" DEFAULT 'active' COMMENT '用户状态:active(默认)/delete(已删除)'")
        ])
    createat = DateTimeField(
        db_column='createAt', constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

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
