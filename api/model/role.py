#!/usr/bin/env python
#-*- coding:utf-8 -*-

import rbac.acl
import rbac.context
from flask import session

from flask_jwt_extended import (get_jwt_identity)
from model.db import db

acl = rbac.acl.Registry()
identity = rbac.context.IdentityContext(acl)

# 注册角色
acl.add_role("test")
acl.add_role("dev")
acl.add_role("pm", ["test", "dev"])

# 注册资源
acl.add_resource("project")
acl.add_resource("demand")
acl.add_resource("bug")
acl.add_resource("case")
acl.add_resource("plan")

#: 注册规则
acl.allow("test", "edit", "case")
acl.allow("dev", "edit", "demand")
acl.allow("test", "edit", "demand")
acl.allow("pm", "edit", "project")


def is_case_owner(_acl, role, op, res):
    print(acl, role, op, res)
    if res != "case":
        return False
    # return get_case_by_id(session['peoject_id']).ownerId == get_jwt_identity()


def get_role(project_id):
    with db.cursor() as cursor:
        sql = "SELECT role \
        FROM projectmember \
        WHERE projectId=%s and memberId=%s"

        cursor.execute(sql, (project_id, get_jwt_identity()))
        result = cursor.fetchone()
    print(result)
    if result:
        return result['role']
    return ''


@identity.set_roles_loader
def load_roles():
    yield get_role(session['project_id'])
