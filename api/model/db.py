# -*- coding: utf-8 -*-
'''数据库连接

@author: Wang Jianhui
'''

import pymysql

db = pymysql.connect(
    user='pms',
    password='pms',
    db='pms',
    cursorclass=pymysql.cursors.DictCursor)
