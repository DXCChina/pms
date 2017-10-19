'''
信息展示接口
'''
from flask import jsonify, request, abort, Blueprint
app = Blueprint('info', __name__, url_prefix='/api')  # pylint: disable=c0103

@app.route("/project", methods=['GET'])
def project_list():
    '''1.获取所有用户列表'''
    return 'developing'

@app.route("/project", methods=['POST'])
def add_project():
    '''1.获取所有用户列表'''
    return 'developing'

@app.route("/task", methods=['GET'])
def task_list():
    '''1.获取所有用户列表'''
    return 'developing'
