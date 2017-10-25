# -*- coding: utf-8 -*-
'''用户管理操作

@author: Wang Jianhui
'''
import traceback

from model.db import db


def findOneById(id):
    '''按 id 查询用户'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT id,username,email FROM user WHERE id=%s"
            cursor.execute(sql, (id))
            result = cursor.fetchone()
    finally:
        return result


def findOneByName(username):
    '''按 username 查询用户'''
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE username=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
    except db.Warning:
        return 'Warning' # 数据被截断等警告
    except db.InterfaceError:
        return 'InterfaceError' # 数据库接口模块本身的错误
    except db.IntegrityError:
        return 'IntegrityError' # 违反完整性约束
    except db.DataError:
        return 'DataError' # 数据超范围等
    except (db.ProgrammingError, db.NotSupportedError):
        return 'ProgramError' # SQL 语法错误等程序错误
    except (db.OperationalError, db.InternalError):
        return 'SystemError' # 连接意外断开,事务处理失败,内存分配错误等系统或数据库内部错误
    else:
        return result
    finally:
        print("save 执行完毕")


def save(user):
    '''添加用户并返回用户信息'''
    try:
        with db.cursor() as cursor:
            sql = "INSERT INTO user (username,email,password) VALUES (%s, %s, %s)"
            cursor.execute(sql,
                           (user['username'], user['email'], user['password']))
        db.commit()
    except db.Warning:
        return 'Warning' # 数据被截断等警告
    except db.InterfaceError:
        return 'InterfaceError' # 数据库接口模块本身的错误
    except db.IntegrityError:
        return 'IntegrityError' # 违反完整性约束
    except db.DataError:
        return 'DataError' # 数据超范围等
    except (db.ProgrammingError, db.NotSupportedError):
        return 'ProgramError' # SQL 语法错误等程序错误
    except (db.OperationalError, db.InternalError):
        return 'SystemError' # 连接意外断开,事务处理失败,内存分配错误等系统或数据库内部错误
    else:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE email=%s"
            cursor.execute(sql, (user['email']))
            result = cursor.fetchone()
        return result
    finally:
        print("save 执行完毕")


def update(id, user):
    '''更新用户信息'''
    return 'deveping...'
