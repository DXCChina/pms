# -*- coding: utf-8 -*-
'''获取项目信息操作

@author: Wang Qianxiang
'''

from .db import (Demand, Activity, TestCase, TestResult, Project, ProjectMember, User, ActivityMember)


def find_owner(p_id):
    '''查询项目拥有者'''
    return Project.get(Project.id == p_id).ownerId


def find_role(p_id, m_id):
    '''查询项目成员权限'''
    return ProjectMember.get((ProjectMember.projectId == p_id) & (ProjectMember.memberId == m_id))


def find_demand(p_id, m_id):
    '''按M_id查询相关项目需求'''
    return list(Demand.select()
        .where((Demand.projectId == p_id) & (Demand.ownerId == m_id))
        .dicts())


def find_activity(p_id, m_id):
    '''按M_id查询相关项目活动'''
    activity = Activity.find().join(ActivityMember).where(
        (Activity.projectId == p_id) and (ActivityMember.memberId == m_id))
    for act in activity:
        act['member'] = list(
            ActivityMember.find(ActivityMember.role, User.username, User.email,
                                User.id).join(User)
            .where(ActivityMember.activityId == act['id']))
        act['demand'] = list(
            Demand.find().where(Demand.activityId == act['id']))
    return list(activity)


def find_test_case(p_id, m_id):
    '''按M_id查询相关项目测试案例'''
    return list(
        TestCase.select()
        .where((TestCase.projectId == p_id) & (TestCase.ownerId == m_id))
        .dicts())


def find_test_result_for_dev(p_id, m_id):
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
        .where((TestCase.projectId == p_id) & (TestResult.devId == m_id))
        .dicts())


def find_test_result_for_test(p_id, m_id):
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
        .where((TestCase.projectId == p_id) & (TestCase.ownerId == m_id))
        .dicts())


def find_all_demand(p_id):
    '''按P_id查询全部项目需求'''
    return list(Demand.select()
        .where(Demand.projectId == p_id)
        .dicts())


def find_all_activity(p_id):
    '''按P_id查询全部项目活动'''

    activity = Activity.find().where(Activity.projectId == p_id)
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


def find_all_test_result(p_id):
    '''按P_id查询全部项目测试结果'''
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
        .where(TestCase.projectId == p_id)
        .dicts())
