# -*- coding: utf-8 -*-
'''测试结果管理操作

@author: Wang Qianxiang
'''

from .db import TestCase, TestResult
from .role import identity


# @identity.check_permission("create", 'test_result')
def create_test_result(test_result):
    '''新建测试结果'''
    return TestResult.get_or_create(
        title=test_result['title'],
        defaults={
            'name': test_result['name'],
            'detail': test_result['detail']
        })


def test_result_detail(r_Id):
    '''获取测试结果详情'''
    return TestResult.sfind(TestResult, TestCase.title.alias('testCaseName')).join(
        TestCase, on=(TestResult.caseId == TestCase.id
                      )).where(TestResult.id == r_Id).get()


# @identity.check_permission("update", 'test_result')
def update_test_results(test_result):
    '''更新测试结果'''    
    TestResult.update(
        name=test_result['name'],
        detail=test_result['detail'],
        ).where(TestResult.id == test_result['id']).execute()
    return TestResult.getOne(TestResult.id == test_result['id'])


def find_test_result_by_id(id):
    return TestResult.getOne(TestResult.id == id)


def find_test_result_by_caseId(caseId):
    return TestResult.getOne(TestResult.caseId == caseId)


def find_test_result_by_name(name):
    return TestResult.getOne(TestResult.name == name)


# def find_test_result_list_match_str(title):
#     '''模糊查询测试结果'''
#     return test_result.sfind().where(test_result.title.contains(title)).dicts()