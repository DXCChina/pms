#!/usr/bin/env python
#-*- coding:utf-8 -*-

from rbac.acl import Registry
from rbac.context import IdentityContext
from flask import session

from flask_jwt_extended import (get_jwt_identity)
from model.db import db

acl = Registry()
identity = IdentityContext(acl)


def is_task_member(_, role, operation, resource):
    print("操作:", role, operation, resource)
    with db.cursor() as cursor:
        sql = "SELECT memberId FROM task WHERE id=%s"
        cursor.execute(sql, (session['task_id']))
        result = cursor.fetchone()
    return result['memberId'] == get_jwt_identity()


# 注册角色
acl.add_role("test")
acl.add_role("dev")
acl.add_role("pm", ["dev", "test"])  # pm 继承 dev 和 test 的权限

# 注册资源
acl.add_resource("project")
acl.add_resource("demand", ["project"])  # demand 继承 project 权限
acl.add_resource("task", ["project"])
acl.add_resource("bug", ["project"])
acl.add_resource("case", ["project"])

# 注册 pm 规则
acl.allow("pm", "update", "project")
acl.allow("pm", "create", "demand")
acl.allow("pm", "create", "task")

# 注册 dev 规则
acl.allow(
    "dev", "update", "task",
    assertion=is_task_member)  # 规则多余,直接 is_task_member 进行认证

# 注册 test 规则
acl.allow(
    "test", "update", "task",
    assertion=is_task_member)  # 规则多余,直接 is_task_member 进行认证
# acl.deny("test", "update", "project")


@identity.set_roles_loader
def _():
    with db.cursor() as cursor:
        sql = "SELECT role \
        FROM projectmember \
        WHERE projectId=%s and memberId=%s"

        cursor.execute(sql, (session['project_id'], get_jwt_identity()))
        result = cursor.fetchone()
    if result:
        print(get_jwt_identity(), '=====user-role======', result['role'])
        yield result['role']
    yield ''
