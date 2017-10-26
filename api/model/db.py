# -*- coding: utf-8 -*-
'''数据库连接

@author: Wang Jianhui
'''

from os import environ
import pymysql

PY_DB_USERNAME = 'PY_DB_USERNAME' in environ and environ['PY_DB_USERNAME'] or 'pms'
PY_DB_PASSWORD = 'PY_DB_PASSWORD' in environ and environ['PY_DB_PASSWORD'] or 'pms'
PY_DB = 'PY_DB' in environ and environ['PY_DB'] or 'pms'

# pylint:disable=c0103
db = pymysql.connect(
    user=PY_DB_USERNAME,
    password=PY_DB_PASSWORD,
    db=PY_DB,
    cursorclass=pymysql.cursors.DictCursor,
    charset='utf8')
