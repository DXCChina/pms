# -*- coding: utf-8 -*-
'''获取项目信息操作

@author: Wang Qianxiang
'''

from .db import (User, Project, ProjectMember, Release, Demand, Activity, ActivityMember, TestCase, TestSet, Case_Set, TestResult)
from playhouse.shortcuts import JOIN


def find_owner_by_release(r_id):
    '''查询项目拥有者'''
    return list(Release.select(Project.ownerId).join(
            Project,
            on = (Release.projectId == Project.id)
        ).where(Release.id == r_id).dicts())[0]['ownerId']


def find_role_by_release(r_id, m_id):
    '''查询项目成员权限'''
    role = list(ProjectMember.select().join(
            Release,
            on = (ProjectMember.projectId == Release.projectId)
        ).where((Release.id == r_id) and (ProjectMember.memberId == m_id)).dicts())
    if role:
        return role[0]['role']
    else:
        return ''


# def find_demand(r_id, m_id):
#     '''按M_id查询相关需求'''
#     return list(Demand.select(Demand, Activity.title.alias('activity'))
#         .join(Activity, on = (Demand.activityId == Activity.id))
#         .where((Demand.releaseId == r_id) & (Activity.ownerId == m_id))
#         .dicts())


def find_activity(r_id, m_id):
    '''按M_id查询相关活动'''
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
    '''按M_id查询相关测试案例'''
    return list(
        TestCase.select(TestCase, Demand.title.alias('demand'), User.username.alias('owner'))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .where((TestCase.releaseId == r_id) & (TestCase.ownerId == m_id))
        .dicts())


def find_test_set(r_id, m_id):
    '''按M_id查询相关测试集'''
    testSet = TestSet.find(
            TestSet,
            User.username.alias('member')
        ).join(User).where((TestSet.releaseId == r_id) and (TestSet.memberId == m_id))
    for ts in testSet:
        ts['testCase'] = list(
            TestCase.find()
                .join(Case_Set, on = (TestCase.id == Case_Set.caseId))
                .where(Case_Set.setId == ts['id'])
        )
    return list(testSet)


def find_test_result_for_dev(r_id, m_id):
    '''按M_id查询开发相关测试结果'''
    devUser = User.alias()
    return list(TestResult.select(
            TestResult,
            TestResult.caseId.alias('testCaseId'),
            TestCase.name.alias('testCase'),
            TestSet.name.alias('testSet'),
            Demand.title.alias('demand'),
            TestCase.input,
            TestCase.expect,
            User.username.alias('owner'),
            devUser.username.alias('dev'))
        .join(TestCase, on = (TestResult.caseId == TestCase.id))
        .join(TestSet, on = (TestResult.testSetId == TestSet.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .join(devUser, on = (TestResult.devId == devUser.id))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .where((TestCase.releaseId == r_id) & (TestResult.devId == m_id))
        .dicts())


def find_test_result_for_test(r_id, m_id):
    '''按M_id查询测试相关测试结果'''
    devUser = User.alias()
    return list(TestResult.select(
            TestResult,
            TestResult.caseId.alias('testCaseId'),
            TestCase.name.alias('testCase'),
            TestSet.name.alias('testSet'),
            Demand.title.alias('demand'),
            TestCase.input,
            TestCase.expect,
            User.username.alias('owner'),
            devUser.username.alias('dev'))
        .join(TestCase, on = (TestResult.caseId == TestCase.id))
        .join(TestSet, on = (TestResult.testSetId == TestSet.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .join(devUser, on = (TestResult.devId == devUser.id))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .where((TestCase.releaseId == r_id) & (TestCase.ownerId == m_id))
        .dicts())


def find_all_demand(r_id):
    '''按r_id查询全部项目需求'''
    return list(Demand.select(Demand, Activity.title.alias('activity'))
        .join(Activity, JOIN.LEFT_OUTER, on = (Demand.activityId == Activity.id))
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


def find_all_test_case(r_id):
    '''按r_id查询全部测试案例'''
    return list(
        TestCase.select(TestCase, Demand.title.alias('demand'), User.username.alias('owner'))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .where(TestCase.releaseId == r_id)
        .dicts())


def find_all_test_set(r_id):
    '''按r_id查询全部测试集'''
    testSet = TestSet.find(
            TestSet,
            User.username.alias('member')
        ).join(User).where(TestSet.releaseId == r_id)
    for ts in testSet:
        ts['testCase'] = list(TestCase.find()
            .join(Case_Set, on = (TestCase.id == Case_Set.caseId))
            .where(Case_Set.setId == ts['id']))
    return list(testSet)


def find_all_test_result(r_id):
    '''按r_id查询全部项目测试结果'''
    devUser = User.alias()
    return list(TestResult.select(
            TestResult,
            TestResult.caseId.alias('testCaseId'),
            TestCase.name.alias('testCase'),
            TestSet.name.alias('testSet'),
            Demand.title.alias('demand'),
            TestCase.input,
            TestCase.expect,
            User.username.alias('owner'),
            devUser.username.alias('dev'))
        .join(TestCase, on = (TestResult.caseId == TestCase.id))
        .join(TestSet, on = (TestResult.testSetId == TestSet.id))
        .join(User, on = (TestCase.ownerId == User.id))
        .join(devUser, on = (TestResult.devId == devUser.id))
        .join(Demand, on = (TestCase.demandId == Demand.id))
        .where(TestCase.releaseId == r_id)
        .dicts())
