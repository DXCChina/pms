# -*- coding: utf-8 -*-
'''数据库连接
python -m pwiz -e mysql -H 122.115.49.94 -u pms pms > api/model/pms.py
@author: Wang Jianhui
'''

import logging
from os import environ
from pymysql import cursors, connect
from playhouse.pool import PooledMySQLDatabase
from peewee import Model, DoesNotExist, DateTimeField, FixedCharField, IntegerField, TextField, SQL, BooleanField, ForeignKeyField

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


def db_char(length=50, null=False):
    return FixedCharField(max_length=length, null=null)


def db_autoDate():
    return DateTimeField(constraints=[SQL('DEFAULT CURRENT_TIMESTAMP')])


def db_date():
    return DateTimeField(null=True)


def db_option(default='', comment=''):
    return FixedCharField(
        max_length=10,
        constraints=[SQL("DEFAULT '%s' COMMENT '%s'" % (default, comment))])


def db_bool(default=0, comment=''):
    return BooleanField(
        constraints=[SQL("DEFAULT '%s' COMMENT '%s'" % (default, comment))])


class MySQLModel(Model):
    class Meta:
        database = database

    @classmethod
    def getOne(cls, *query, **kwargs):
        '''数据不存在返回None，而不是抛出异常,use "sget" instead'''
        try:
            return cls.get(*query, **kwargs)
        except DoesNotExist:
            return None

    @classmethod
    def find(cls, *select):
        """封装 peewee select 接口,返回 dict"""
        return super(MySQLModel, cls).select(*select).dicts()

    @classmethod
    def findOne(cls, *where):
        """封装 peewee get 接口,返回 dict"""
        return cls.find().where(*where).get()

    @classmethod
    def sget(cls, *query):
        '''封装 peewee get 接口,数据不存在返回None，而不是抛出异常'''
        try:
            return cls.get(*query)
        except DoesNotExist:
            return None

    @classmethod
    def sfind(cls, *select):
        '''封装 peewee select 接口,数据不存在返回空字典，而不是抛出异常'''
        try:
            return cls.find(*select)
        except DoesNotExist:
            return {}


class User(MySQLModel):
    '''用户表'''
    id = db_autoId()
    username = FixedCharField(unique=True, max_length=50)
    password = FixedCharField(max_length=100)
    email = FixedCharField(unique=True, max_length=50)
    status = db_option(default='active', comment='用户状态:active(默认)/delete(已删除)')
    createAt = db_autoDate()

    class Meta:
        db_table = 'user'


class Demand(MySQLModel):
    '''需求表'''
    id = db_autoId()
    title = db_char()
    detail = TextField(null=True)
    level = db_option(default='normal', comment='low(低)/high(高)/normal(中,默认)')
    projectId = db_id()
    activityId = IntegerField(null=True)
    status = db_bool(default=0, comment='0(未完成)/1(已完成)')
    createAt = db_autoDate()

    class Meta:
        db_table = 'demand'


class ActivityBase(MySQLModel):
    '''活动表基类'''
    title = db_char()
    detail = TextField(null=True)
    memberId = IntegerField(null=True)
    projectId = db_id()
    progress = IntegerField(null=True)
    cost = IntegerField(null=True)
    status = db_option(
        default='new',
        comment='new(新建,未分配),dev-ing(开发中),needtest(开发完待测试),test-ing(测试中),fix-ing(修复中),finish(已完成),close(已关闭)'
    )
    createAt = db_autoDate()
    startDate = db_autoDate()
    endDate = db_date()

    class Meta:
        db_table = 'activity'


class Activity(ActivityBase):
    '''活动表'''
    id = db_autoId()


class Project(MySQLModel):
    '''项目表'''
    id = db_autoId()
    name = FixedCharField(unique=True, max_length=50)
    detail = TextField(null=True)
    ownerId = db_id()
    status = db_option(default='active', comment='active(默认)/done/delete')
    createAt = db_autoDate()
    startDate = db_autoDate()
    endDate = db_date()
    type = db_char(length=10, null=True)

    class Meta:
        db_table = 'project'


class ProjectMember(MySQLModel):
    '''项目成员'''
    id = db_autoId()
    memberId = ForeignKeyField(User, related_name='project')
    projectId = db_id()
    role = db_option(default='dev', comment='用户角色:dev/test')

    class Meta:
        db_table = 'project_member'


class TestCase(MySQLModel):
    '''测试用例表'''
    id = db_autoId()
    name = db_char()
    detail = TextField(null=True)
    demandId = db_id()
    projectId = db_id()
    ownerId = db_id()
    type = db_char(length=10, null=True)
    input = db_char()
    expect = db_char()

    class Meta:
        db_table = 'test_case'


class TestResult(MySQLModel):
    '''测试结果表'''
    id = db_autoId()
    name = db_char()
    detail = TextField(null=True)
    caseId = db_id()
    output = db_char()
    result = db_bool(
        default=0, comment='0(bug)/1(正常)')
    status = db_option(default='close', comment='tofix,tocheck,close(默认)')
    level = db_option('normal', '优先级:low(低)/high(高)/normal(中,默认)')
    devId = db_id()
    priority = db_option('normal', '严重程度:low(低)/high(高)/normal(中,默认)')

    class Meta:
        db_table = 'test_result'
