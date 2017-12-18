# -*- coding: utf-8 -*-
'''获取项目信息操作

@author: Wang Qianxiang
'''

from .db import (Demand, Activity, TestCase, TestResult, Project, ProjectMember, Release, User, ActivityMember)


def find_owner_by_release(r_id):
    '''查询项目拥有者'''
    return Release.select(Project.ownerId).join(
            Project,
            on = (Release.projectId == Project.id)
        ).where(Release.id == r_id)


def find_role_by_release(r_id, m_id):
    '''查询项目成员权限'''
    return ProjectMember.select(ProjectMember.role).join(
            Release,
            on = (ProjectMember.projectId == Release.projectId)
        ).where((Release.id == r_id) and (ProjectMember.memberId == m_id))


def find_demand(r_id, m_id):
    '''按M_id查询相关项目需求'''
    return list(Demand.select()
        .where((Demand.releaseId == r_id) & (Demand.ownerId == m_id))
        .dicts())


def find_activity(r_id, m_id):
    '''按M_id查询相关项目活动'''
    activity = Activity.find().join(ActivityMember).where(
        (Activity.releaseId == r_id) and (ActivityMember.memberId == m_id))
    for act in activity:
        act['member'] = list(
            ActivityMember.find(ActivityMember.role, User.username, User.email,
                                User.id).join(User)
            .where(ActivityMember.activityId == act['id']))
        act['demand'] = list(
            Demand.find().where(Demand.activityId == act['id']))
    return list(activity)


def find_test_case(r_id, m_id):
    '''按M_id查询相关项目测试案例'''
    return list(
        TestCase.select()
        .where((TestCase.releaseId == r_id) & (TestCase.ownerId == m_id))
        .dicts())


def find_test_result_for_dev(r_id, m_id):
    '''按M_id查询开发相关项目测试结果'''
    return list(TestResult.select(
            TestResult,
            TestCase.id.alias('caseId'),
            TestCase.name.alias('caseName'),
            Demand.title.alias('demandName'),
            TestCase.input,
            TestCase.expect,
            User.username.alias('ownerName'))
        .join(TestCase, on = (TestResult.caseId == TestCase.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .where((TestCase.releaseId == r_id) & (TestResult.devId == m_id))
        .dicts())


def find_test_result_for_test(r_id, m_id):
    '''按M_id查询测试相关项目测试结果'''
    return list(TestResult.select(
            TestResult,
            TestCase.id.alias('caseId'),
            TestCase.name.alias('caseName'),
            Demand.title.alias('demandName'),
            TestCase.input,
            TestCase.expect,
            User.username.alias('ownerName'))
        .join(TestCase, on = (TestResult.caseId == TestCase.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .where((TestCase.releaseId == r_id) & (TestCase.ownerId == m_id))
        .dicts())


def find_all_demand(r_id):
    '''按r_id查询全部项目需求'''
    return list(Demand.select()
        .where(Demand.releaseId == r_id)
        .dicts())


def find_all_activity(r_id):
    '''按r_id查询全部项目活动'''

    activity = Activity.find().where(Activity.releaseId == r_id)
    for act in activity:
        act['member'] = list(
            ActivityMember.find(
                ActivityMember.role, User.username, User.email, User.id
            ).join(User)
            .where(ActivityMember.activityId == act['id'])
        )
        act['demand'] = list(
            Demand.find().where(Demand.activityId == act['id'])
        )
    return list(activity)


def find_all_test_result(r_id):
    '''按r_id查询全部项目测试结果'''
    return list(TestResult.select(
            TestResult,
            TestCase.id.alias('caseId'),
            TestCase.name.alias('caseName'),
            Demand.title.alias('demandName'),
            TestCase.input,
            TestCase.expect,
            User.username.alias('ownerName'))
        .join(TestCase, on = (TestResult.caseId == TestCase.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .where(TestCase.releaseId == r_id)
        .dicts())
