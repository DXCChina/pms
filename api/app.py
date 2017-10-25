#!/usr/bin/env python
'''
api入口

不包含任何业务逻辑
'''
from datetime import datetime
from os import environ
from flask import Flask
from flask_jwt_extended import (JWTManager)
from controller import bps

app = Flask(__name__)  # pylint:disable=c0103
app.config['JWT_SECRET_KEY'] = environ['JWT_SECRET_KEY']  # JWT 加密密钥串
app.config['JWT_TOKEN_LOCATION'] = ['headers', 'cookies']  # JWT Token 保存位置
app.config['JWT_SESSION_COOKIE'] = False  # 永久 Cookie
app.config['JWT_ACCESS_COOKIE_PATH'] = '/api/'

jwt = JWTManager(app)

@jwt.user_identity_loader
def user_identity_lookup(user):
    return user['username']
@jwt.user_claims_loader
def add_claims_to_access_token(user):
    now = datetime.utcnow()
    return {
        'email': user['email']
    }


for bp in bps:
    app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        debug='PY_ENV' in environ and environ['PY_ENV'] == 'dev')
