'''
user
'''
from flask import jsonify, request, abort, Blueprint
from model import user
app = Blueprint('user', __name__, url_prefix='/api')  # pylint: disable=c0103

@app.route("/user", methods=['GET'])
def userlist():
    '''1.获取所有用户列表'''
    return jsonify(user.findAll())
