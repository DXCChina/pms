from model.db import db

def findAll():
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user"
            cursor.execute(sql)
            result = cursor.fetchall()
    finally:
        print(result)
        return result


def findOneById(id):
    try:
        with db.cursor() as cursor:
            sql = "SELECT id,username,email FROM user WHERE id=%s"
            cursor.execute(sql, (id))
            result = cursor.fetchone()
    finally:
        return result


def findOneByName(username):
    try:
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE username=%s"
            cursor.execute(sql, (username))
            result = cursor.fetchone()
    finally:
        return result


def save(user):
    print('user:', user)
    try:
        with db.cursor() as cursor:
            sql = "INSERT INTO user (username,email,password) VALUES (%s, %s, %s)"
            cursor.execute(sql,
                           (user['username'], user['email'], user['password']))
        db.commit()
        with db.cursor() as cursor:
            sql = "SELECT * FROM user WHERE email=%s"
            cursor.execute(sql, (user['email']))
            result = cursor.fetchone()
    finally:
        print('result', result)
        return result


def update(id, user):
    return 'deveping...'
