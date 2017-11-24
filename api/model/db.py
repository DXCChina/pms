# -*- coding: utf-8 -*-
'''数据库连接
python -m pwiz -e mysql -H 122.115.49.94 -u pms pms > api/model/pms.py
@author: Wang Jianhui
'''

import logging
from os import environ
from pymysql import cursors, connect
from playhouse.pool import PooledMySQLDatabase
from peewee import Model, DoesNotExist, DateTimeField, FixedCharField, IntegerField, TextField, SQL, BooleanField

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


def db_autoId():
    return IntegerField(primary_key=True, constraints=[SQL('AUTO_INCREMENT')])


def db_id():
    return IntegerField()


def db_name():
    return FixedCharField(max_length=50)
def db_type():
    return FixedCharField(max_length=50, null=True)
def db_detail():
    return TextField(null=True)
def db_autoDate():
    return DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])
def db_date():
    return DateTimeField(null=True)
def db_level():
    return FixedCharField(
    max_length=50,
    constraints=[
        SQL("DEFAULT 'normal' COMMENT 'low(低)/high(高)/normal(中,默认)'")
    ])


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
    createAt = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    class Meta:
        db_table = 'user'


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
    projectId = IntegerField()
    activityId = IntegerField()
    status = BooleanField(
        constraints=[SQL("DEFAULT 0 COMMENT '0(未完成)/1(已完成)'")])
    createAt = DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])

    class Meta:
        db_table = 'demand'


# 活动表
class Activity(MySQLModel):
    id = IntegerField(primary_key=True, constraints=[SQL('AUTO_INCREMENT')])
    title = FixedCharField(max_length=50)
    detail = TextField(null=True)
    memberId = IntegerField()
    projectId = IntegerField()
    progress = IntegerField(null=True)
    cost = IntegerField(null=True)
    status = FixedCharField(
        max_length=10,
        constraints=[
            SQL("DEFAULT 'new' COMMENT 'new(新建,未分配),dev-ing(开发中),needtest(开发完待测试),test-ing(测试中),fix-ing(修复中),finish(已完成),close(已关闭)'"
                )
        ])
    createAt = FixedCharField(
        max_length=50, constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])
    startDate = FixedCharField(
        max_length=50, constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])
    endDate = FixedCharField(max_length=50, null=True)

    class Meta:
        db_table = 'activity'


# 项目表
class Project(MySQLModel):
    id = IntegerField(primary_key=True, constraints=[SQL('AUTO_INCREMENT')])
    name = FixedCharField(unique=True, max_length=50)
    detail = TextField(null=True)
    ownerId = IntegerField()
    status = FixedCharField(
        max_length=10,
        constraints=[SQL("DEFAULT 'active' COMMENT 'active(默认)/done/delete'")])
    createAt = db_autoDate()
    startDate = db_autoDate()
    endDate = db_date()
    type = db_type()

    class Meta:
        db_table = 'project'


# 项目成员
class ProjectMember(MySQLModel):
    id = db_autoId()
    memberId = db_id()
    projectId = db_id()
    role = FixedCharField(
        max_length=50,
        constraints=[SQL("DEFAULT 'dev' COMMENT '用户角色:dev/test'")])

    class Meta:
        db_table = 'project_member'


# 测试用例表
class TestCase(MySQLModel):
    id = db_autoId()
    name = db_name()
    detail = db_detail()
    demandId = db_id()
    projectId = db_id()
    type = db_type()
    input = db_name()
    expect = db_name()

    class Meta:
        db_table = 'test_case'


# 测试结果表
class TestResult(MySQLModel):
    id = db_autoId()
    name = db_name()
    detail = db_detail()
    caseId = db_id()
    output = db_name()
    result = BooleanField(
        constraints=[SQL("DEFAULT 0 COMMENT '0(bug)/1(正常)'")])
    status = FixedCharField(
        max_length=10,
        constraints=[SQL("DEFAULT 'close' COMMENT 'tofix,tocheck,close(默认)'")])
    level = db_level()
    devId = db_id()
    priority = db_level()

    class Meta:
        db_table = 'test_result'
