# -*- coding: utf-8 -*-
'''文件上传接口'''
import sys
import os
from uuid import uuid4
from flask import request
from werkzeug.utils import secure_filename

def allowed_img(filename):
    '''检测图片文件类型'''
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ['png', 'jpg', 'jpeg', 'gif']

def save_image():
    '''图片上传'''
    target = os.path.join(sys.path[0], '..', 'dist', 'img')

    if not os.path.exists(target):
        os.mkdir(target)
    for file in request.files.getlist("file"):
        if file and allowed_img(file.filename):
            filename = secure_filename(file.filename)
            name = str(uuid4()) + os.path.splitext(filename)[1]
            file.save(os.path.join(target, name))
            return {'link': '/img/%s' % (name)}
    return 'error'
