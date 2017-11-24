# -*- coding: utf-8 -*-
'''数据库连接
python -m pwiz -e mysql -H 122.115.49.94 -u pms pms > api/model/pms.py
@author: Wang Jianhui
'''

import logging
from os import environ
from pymysql import cursors, connect
from playhouse.pool import PooledMySQLDatabase
from peewee import Model, DoesNotExist, DateTimeField, FixedCharField, IntegerField, TextField, SQL

logger = logging.getLogger('peewee')    
logger.setLevel(
    'PY_ENV' in environ and environ['PY_ENV'] == 'dev' and logging.DEBUG
    or logging.WARNING)
logger.addHandler(logging.StreamHandler())

DB_CONF = {
    'database':
    'PY_DB_NAME' in environ and environ['PY_DB_NAME'] or 'pms',
    'host':
    'PY_DB_HOST' in environ and environ['PY_DB_HOST'] or 'localhost',
    'user':
    'PY_DB_USERNAME' in environ and environ['PY_DB_USERNAME'] or 'pms',
    'password':
    'PY_DB_PASSWORD' in environ and environ['PY_DB_PASSWORD'] or 'pms',
    'charset':
    'utf8',
    'max_connections':
    32,
    'stale_timeout':
    300  # 5 minutes.
}
print('\n\n', '数据库配置:', DB_CONF, '\n\n')
# peewee 实现
database = PooledMySQLDatabase(**DB_CONF)
# pymysql 实现
DB_CONF.pop('max_connections', None)
DB_CONF.pop('stale_timeout', None)
DB_CONF['cursorclass'] = cursors.DictCursor
db = connect(**DB_CONF)


class MySQLModel(Model):
    class Meta:
        database = database

    @classmethod
    def getOne(cls, *query, **kwargs):
        # 数据不存在返回None，而不是抛出异常
        try:
            return cls.get(*query, **kwargs)
        except DoesNotExist:
            return None


# 需求表
class Demand(MySQLModel):
    id = IntegerField(primary_key=True, constraints=[SQL('AUTO_INCREMENT')])
    title = FixedCharField(max_length=50)
    detail = TextField(null=True)
    level = FixedCharField(
        max_length=50,
        constraints=[
            SQL("DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)'")
        ])
    projectid = IntegerField(db_column='projectId')
    taskid = IntegerField(db_column='ownerId')
    # status=boolen
    createat = DateTimeField(
        db_column='createAt', constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    class Meta:
        db_table = 'demand'

# 活动表
class Activity(MySQLModel):
    id = IntegerField(primary_key=True, constraints=[SQL('AUTO_INCREMENT')])
    title=FixedCharField(max_length=50)
    # detail
    memberId=IntegerField()
    projectid =IntegerField()
    progress = IntegerField(null=True)
    cost = IntegerField(null=True)
    # status= new,dev-ing,needtest,test-end,fix-ing,finish,close
    createat = FixedCharField(db_column='startDate', max_length=50)
    endat = FixedCharField(db_column='endDate', max_length=50, null=True)

# 项目表
# class Project(MySQLModel):
#     id
#     name = FixedCharField(unique=True)
#     detail = TextField(null=True)
#     ownerid = IntegerField(db_column='ownerId')
#     status = FixedCharField()
#     createat = DateTimeField(db_column='createAt')
#     endat
#     type

#     class Meta:
#         db_table = 'project'

# 项目成员
class Projectmember(MySQLModel):
    memberid = IntegerField(db_column='memberId')
    projectid = IntegerField(db_column='projectId')
    role=FixedCharField(
        constraints=[
            SQL(" DEFAULT 'dev' COMMENT '用户状态:dev/test'")
        ])

#     class Meta:
#         db_table = 'projectmember'

# 测试用例表
# id
# name
# detail
# Demandid
# projectId
# type
# input
# expect

# test-result表
# id
# name
# detail
# caseId
# output
# result
# status:tofix,tocheck,close
# level
# devId
# priority
