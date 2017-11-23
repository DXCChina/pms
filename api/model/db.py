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
    ownerid = IntegerField(db_column='ownerId')
    projectid = IntegerField(db_column='projectId')
    title = FixedCharField(max_length=50)
    detail = TextField(null=True)
    level = FixedCharField(
        max_length=50,
        constraints=[
            SQL("DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)'")
        ])
    status = FixedCharField(
        max_length=50,
        constraints=[SQL("DEFAULT 'active' COMMENT 'active(默认)/done/delete'")])
    createat = DateTimeField(
        db_column='createAt', constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])
    startdate = FixedCharField(db_column='startDate', max_length=50)
    enddate = FixedCharField(db_column='endDate', max_length=50, null=True)
    progress = IntegerField(null=True)
    cost = IntegerField(null=True)

    class Meta:
        db_table = 'demand'


# class Project(MySQLModel):
#     createat = DateTimeField(db_column='createAt')
#     detail = TextField(null=True)
#     name = FixedCharField(unique=True)
#     ownerid = IntegerField(db_column='ownerId')
#     status = FixedCharField()

#     class Meta:
#         db_table = 'project'

# class Projectmember(MySQLModel):
#     memberid = IntegerField(db_column='memberId')
#     projectid = IntegerField(db_column='projectId')

#     class Meta:
#         db_table = 'projectmember'

# class Task(MySQLModel):
#     cost = FloatField(null=True)
#     createat = DateTimeField(db_column='createAt')
#     demandid = IntegerField(db_column='demandId')
#     detail = TextField(null=True)
#     enddate = FixedCharField(db_column='endDate', null=True)
#     level = FixedCharField()
#     memberid = IntegerField(db_column='memberId')
#     ownerid = IntegerField(db_column='ownerId')
#     progress = IntegerField(null=True)
#     startdate = FixedCharField(db_column='startDate')
#     status = FixedCharField()
#     title = FixedCharField()

#     class Meta:
#         db_table = 'task'
