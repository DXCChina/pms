import pymysql

db = pymysql.connect(
    user='pms',
    password='pms',
    db='pms',
    cursorclass=pymysql.cursors.DictCursor)
