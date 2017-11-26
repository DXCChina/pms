# -*- coding: utf-8 -*-
'''获取项目信息操作

@author: Wang Qianxiang
'''

from .db import (Demand, Activity, TestCase, TestResult, Project, ProjectMember)


def find_owner(p_id):
    '''查询项目拥有者'''
    return Project.getOne(Project.id == p_id).ownerId


def find_role(p_id, m_id):
    '''查询项目成员权限'''
    return ProjectMember.getOne(ProjectMember.projectId == p_id and ProjectMember.memberId == m_id)


def find_demand(p_id, m_id):
    '''按M_id查询相关项目需求'''
    return Demand.get(Demand.projectId == p_id and Demand.ownerId == m_id)


def find_activity(p_id, m_id):
    '''按M_id查询相关项目活动'''
    return Activity.get(Activity.projectId == p_id and Activity.memberId == m_id)


def find_test_case(p_id, m_id):
    '''按M_id查询相关项目测试案例'''
    return TestCase.get(TestCase.projectId == p_id and TestCase.ownerId == m_id)


def find_test_result_for_dev(p_id, m_id):
    '''按M_id查询开发相关项目测试结果'''
    return TestResult.get(TestResult.projectId == p_id and TestResult.devId == m_id)


def find_test_result_for_test(p_id, m_id):
    '''按M_id查询测试相关项目测试结果'''
    return TestResult.get(TestResult.projectId == p_id and TestResult.ownerId == m_id)


def find_all_demand(p_id):
    '''按M_id查询全部项目需求'''
    return Demand.getOne(Demand.projectId == p_id)


def find_all_activity(p_id):
    '''按M_id查询全部项目活动'''
    return Activity.getOne(Activity.projectId == p_id)


def find_all_test_case(p_id):
    '''按M_id查询全部项目测试案例'''
    return TestCase.getOne(TestCase.projectId == p_id)


def find_all_test_result(p_id):
    '''按M_id查询全部项目测试结果'''
    return TestResult.getOne(TestResult.projectId == p_id)
