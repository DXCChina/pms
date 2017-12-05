#!/usr/bin/env python
#-*- coding:utf-8 -*-

from rbac.acl import Registry
from rbac.context import IdentityContext
from flask import session

from flask_jwt_extended import (get_jwt_identity)
from model.db import db, Project, ProjectMember, ActivityMember

acl = Registry()
identity = IdentityContext(acl)


def is_task_member(_, role, operation, resource):
    '''判断是否是活动成员'''
    data = ActivityMember.select().where(
        ActivityMember.activityId == session['task_id']
    )
    print("操作:", role, operation, resource, data)
    for d in data:
        print('##########',d.memberId_id, get_jwt_identity())
        if d.memberId_id == get_jwt_identity():
            return True
    return False
    # with db.cursor() as cursor:
    #     sql = "SELECT * FROM activity_member WHERE activityId_id=%s"
    #     cursor.execute(sql, (session['task_id']))
    #     result = cursor.fetchall()
    # return result['memberId_id'] == get_jwt_identity()


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
acl.add_resource("project_member", ["project"])
# acl.add_resource("activity", ["project"])

# 注册 pm 规则
acl.allow("pm", "update", "project")
acl.allow("pm", "create", "project")

# 注册 dev 规则
acl.allow(
    "dev", "update", "task",
    assertion=is_task_member)  # 规则多余,直接 is_task_member 进行认证

# 注册 test 规则
acl.allow(
    "test", "update", "task",
    assertion=is_task_member)  # 规则多余,直接 is_task_member 进行认证
# acl.deny("test", "update", "project")
acl.allow("test", "create", "case", assertion=is_task_member)


@identity.set_roles_loader
def _():
    '''判断用户角色'''
    result = ProjectMember.sget(
        ProjectMember.projectId == session['project_id'],
        ProjectMember.memberId == get_jwt_identity()
    )
    if result:
        print(get_jwt_identity(), '=====user-role======', result.role)
        yield result.role
    result = Project.sget(Project.id == session['project_id'])
    if result and result.ownerId == get_jwt_identity():
        print(result.ownerId, '=====user-role======', 'pm')
        yield 'pm'
