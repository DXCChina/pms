#!/usr/bin/env python
from flask import Flask, jsonify,url_for,request,abort
import pymysql.cursors

app = Flask(__name__)

# Connect to the database
connection = pymysql.connect(user='pms',
                             password='pms',
                             db='pms',
                             cursorclass=pymysql.cursors.DictCursor)

@app.route("/api/hi", methods=['GET'])
def index():
    try:
        with connection.cursor() as cursor:
            # Read a single record
            sql = "SELECT * FROM user"
            cursor.execute(sql)
            result = cursor.fetchall()
            print(result)
    finally:
        return jsonify(result)

@app.route("/api/hi/<id>", methods=['GET'])
def query(id):
    try:
        with connection.cursor() as cursor:
            # Read a single record
            sql = "SELECT id,username,email FROM user WHERE id=%s"
            cursor.execute(sql, (id))
            result = cursor.fetchone()
            print(result)
    finally:
        return jsonify(result)

@app.route("/api/hi", methods=['POST'])
def add():
    if not request.json or not 'username' in request.json or not 'password' in request.json or not 'email' in request.json:
        print(request.json)
        abort(400)
    try:
        with connection.cursor() as cursor:
            # Create a new record
            sql = "INSERT INTO user (username,email,password) VALUES (%s, %s, %s)"
            cursor.execute(sql, (request.json['username'],request.json['email'],request.json['password']))

        # connection is not autocommit by default. So you must commit to save
        # your changes.
        connection.commit()

        with connection.cursor() as cursor:
            # Read a single record
            sql = "SELECT * FROM user WHERE email=%s"
            cursor.execute(sql, (request.json['email']))
            result = cursor.fetchone()
            print(result)
    finally:
        return jsonify(result)

@app.route("/api/hi", methods=['PUT'])
def update():
    if not request.json or not 'id' in request.json:
        abort(400)
    return 'deveping...'

@app.route("/api/hi/<int:id>", methods=['DELETE'])
def delete(id):
    return 'deveping...'

if __name__ == "__main__":
    app.run(host="0.0.0.0")
