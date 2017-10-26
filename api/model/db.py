# -*- coding: utf-8 -*-
'''数据库连接

@author: Wang Jianhui
'''

from os import environ
import pymysql

PY_DB_USERNAME = 'PY_DB_USERNAME' in environ and environ['PY_DB_USERNAME'] or 'pms'
PY_DB_PASSWORD = 'PY_DB_PASSWORD' in environ and environ['PY_DB_PASSWORD'] or 'pms'
PY_DB_NAME = 'PY_DB_NAME' in environ and environ['PY_DB_NAME'] or 'pms'
PY_DB_HOST = 'PY_DB_HOST' in environ and environ['PY_DB_HOST'] or 'localhost'
PY_DB_DEBUG = 'PY_ENV' in environ and environ['PY_ENV'] == 'dev'

# pylint:disable=c0103
db = pymysql.connect(
    host=PY_DB_HOST,
    user=PY_DB_USERNAME,
    password=PY_DB_PASSWORD,
    db=PY_DB_NAME,
    cursorclass=pymysql.cursors.DictCursor)
print('建立数据库连接:', {
    'host': PY_DB_HOST,
    'user': PY_DB_USERNAME,
    'password': PY_DB_PASSWORD,
    'db': PY_DB_NAME,
    'debug': PY_DB_DEBUG,
    'cursorclass': pymysql.cursors.DictCursor
})
