# -*- coding: utf-8 -*-
'''获取项目信息操作

@author: Wang Qianxiang
'''

from .db import (Demand, Activity, TestCase, TestResult, ProjectMember)


def findRoleByMId(pId, mId):
    '''查询项目成员权限'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findDemandByMId(pId, mId):
    '''按MId查询相关项目需求'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findActivityByMId(pId, mId):
    '''按MId查询相关项目活动'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findTestCaseByMId(pId, mId):
    '''按MId查询相关项目测试案例'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findTestResultByMId(pId, mId):
    '''按MId查询相关项目测试结果'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findAllDemand(pId):
    '''按MId查询全部项目需求'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findAllActivity(pId):
    '''按MId查询全部项目需求'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findAllTestCase(pId):
    '''按MId查询全部项目需求'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)


def findAllTestResult(pId):
    '''按MId查询全部项目需求'''
    return ProjectMember.getOne(ProjectMember.projectId == pId and ProjectMember.memberId == mId)
