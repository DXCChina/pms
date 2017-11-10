from hypothesis import given, example
from hypothesis.strategies import tuples, booleans, lists, text, integers
import random
import string
from app import app
from model import user
from flask import json


def test_user_model():
    username = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', 6))
    email = username + '@' + 'qq.com'
    password = username

    user.save({'username': username, 'email': email, 'password': password})

    account = user.findOneByName(username)

    assert account['username'] == username
    id = account['id']
    password = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', 6))

    user.change_password(id, password)

    username = ''.join(random.sample('abcdefghijklmnopqrstuvwxyz', 6))
    email = username + '@' + 'qq.com'

    user.update({'username': username, 'email': email, 'id': id})

    assert user.findOneById(id)['password'] == password

    assert user.findOneByEmail(email)['email'] == email


tester = app.test_client()


def test_get_user():
    response = tester.get('/api/user')
    assert response.data == b'{\n  "msg": "Missing JWT in headers and cookies"\n}\n'


def test_login():
    response = tester.post(
        '/api/login',
        data=json.dumps({
            'username': 'aaa@aaa.qaaa',
            'password': 'aaa@aaa.qaaa'
        }),
        content_type='application/json')
    data = json.loads(response.data)

    assert data['access_token']
