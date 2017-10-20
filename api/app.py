#!/usr/bin/env python
'''
api入口

不包含任何业务逻辑
'''
from os import environ
from flask import Flask
from controller import bps

app = Flask(__name__)  # pylint:disable=c0103

for bp in bps:
    app.register_blueprint(bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug='PY_ENV' in environ and environ['PY_ENV'] == 'dev')
