#!/usr/bin/env python
from flask import Flask, jsonify,url_for
import platform

app = Flask(__name__)

content={
    'languange':'python',
    'version':platform.python_version(),
    'system':platform.system(),
    'aa':{}
}

@app.route("/api/hi", methods=['GET'])
def index():
    return jsonify(content)

@app.route("/api/hi/<param>", methods=['GET'])
def query(param):
    return jsonify(content[param])

@app.route("/api/hi", methods=['POST'])
def add():
    if not request.json or not 'id' in request.json:
        abort(400)
    content[request.json['id']]=request.json
    return jsonify(content)

@app.route("/api/hi", methods=['PUT'])
def update():
    if not request.json or not 'id' in request.json:
        abort(400)
    if not content[request.json['id']]:
        abort(404)
    content[request.json['id']]=request.json
    return jsonify(content)

@app.route("/api/hi/<int:id>", methods=['DELETE'])
def delete(id):
    del content[id]
    return jsonify(content)

if __name__ == "__main__":
    app.run()
