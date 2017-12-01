# -*- coding: utf-8 -*-
'''测试结果管理操作

@author: Wang Qianxiang
'''

from .db import Demand, ActivityMember, TestCase, TestResult


def create_test_result(test_result):
    '''新建测试结果'''
    return TestResult.create(
        name=test_result['name'],
        detail=test_result['detail'],
        caseId=test_result['caseId'],
        output=test_result['output'],
        status=test_result['status'],
        devId=TestCase.select(ActivityMember.memberId)
            .join(Demand, on=(TestCase.demandId == Demand.id))
            .join(ActivityMember, on=(Demand.activityId == ActivityMember.activityId))
            .where((TestCase.id == test_result['caseId']) and (ActivityMember.role == "dev"))
            .get().username,
        defaults={
            'level': test_result['level'],
            'priority': test_result['priority']
        })


def update_test_results(test_result):
    '''更新测试结果'''
    TestResult.update(
        name=test_result['name'],
        detail=test_result['detail'],
        ).where(TestResult.id == test_result['id']).execute()
    return TestResult.getOne(TestResult.id == test_result['id'])


def test_result_detail(r_id):
    '''获取测试结果详情'''
    return TestResult.sfind(
        TestResult,
        TestCase.name.alias('testCaseName')
    ).join(
        TestCase,
        on=(TestResult.caseId == TestCase.id)
    ).where(TestResult.id == r_id).get()


def find_test_result_by_id(test_result_id):
    '''按test_result_id查询测试结果'''
    return TestResult.getOne(TestResult.id == test_result_id)


def find_test_result_by_case(case_id):
    '''按case_id更新测试结果'''
    return TestResult.getOne(TestResult.caseId == case_id)


def find_test_result_by_name(test_result_name):
    '''按test_result_name更新测试结果'''
    return TestResult.getOne(TestResult.name == test_result_name)
