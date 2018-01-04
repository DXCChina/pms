import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListMetrics, ItemMetrics } from './card-data.Entity';
import { RoleModel } from './role.model';
import { DashboardViewService } from './dashboard-view.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss']
})

export class DashboardViewComponent implements OnInit {
  public demandData: any[] = [];
  public activityData: any[] = [];
  public testCaseData: any[] = [];
  public testSetData: any[] = [];
  public testResultData: any[] = [];

  private releaseId: string;
  private role: string;

  constructor(
    private router: Router,
    private service: DashboardViewService
  ) {}

  ngOnInit() {
    this.releaseId = sessionStorage.getItem('releaseId');
    this.role = sessionStorage.getItem('userRoleInProject');

    if (!this.releaseId || !this.role) {
      this.router.navigate(['/welcome']);
    } else {
      this.initData();
    }
  }

  // 初始化数据 调用三个接口
  initData() {
    this.getProjectDemand();
    this.getProjectActivity();
    this.getProjectTestResult();
  }

  getProjectDemand() {
    this.service.getViewData(this.releaseId, 'demand')
      .then(res => {
        this.demandData = [];
        this.demandData.push(
          new ListMetrics(
            '待处理需求',
            res
              .filter(i => {
                return !i.activityId;
              })
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.detail, '', i.level);
              })
          )
        );

        this.demandData.push(
          new ListMetrics(
            '已分配需求',
            res
              .filter(i => {
                return i.activityId;
              })
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.detail, '', i.level);
              })
          )
        );

        this.demandData.push(
          new ListMetrics(
            '全部需求',
            res
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.detail, '', i.level);
              })
          )
        );

      }).catch(err => console.log(err));
  }

  getProjectActivity() {
    this.service.getViewData(this.releaseId, 'activity')
      .then(res => {

        this.activityData = [];
        this.activityData.push(
          new ListMetrics(
            '进行中活动',
            res
              .filter(i => {
                return i.status === 'dev-ing';
              })
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.detail, '', '');
              })
          )
        );

        this.activityData.push(
          new ListMetrics(
            '待测试活动',
            res
              .filter(i => {
                return i.status === 'needtest';
              })
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.detail, '', '');
              })
          )
        );

        this.activityData.push(
          new ListMetrics(
            '全部活动',
            res
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.detail, '', '');
              })
          )
        );

      }).catch(err => console.log(err));
  }

  getProjectTestResult() {
    this.service.getViewData(this.releaseId, 'testResult')
      .then(res => {

        this.testResultData.push(
          new ListMetrics(
            '待修复测试结果',
            res
              .filter(i => {
                return i.status === 'tofix';
              })
              .map(i => {
                return new ItemMetrics(i, i.name, '', i.detail, '', i.level);
              })
          )
        );

        this.testResultData.push(
          new ListMetrics(
            '待审核测试结果',
            res
              .filter(i => {
                return i.status === 'tocheck';
              })
              .map(i => {
                return new ItemMetrics(i, i.name, '', i.detail, '', i.level);
              })
          )
        );

        this.testResultData.push(
          new ListMetrics(
            '已通过测试结果',
            res
              .filter(i => {
                return i.status === 'close';
              })
              .map(i => {
                return new ItemMetrics(i, i.name, '', i.detail, '', i.level);
              })
          )
        );

      }).catch(err => console.log(err));
  }

  addDemand() {
    this.router.navigate([`/pages/project/demand/new`]);
  }

  showDemandDetail(data) {
    this.router.navigate([`/pages/project/demand/${data.id}`]);
  }

  addTask() {
    this.router.navigate([`/pages/project/devSet/new`]);
  }

  showTaskDetail(data) {
    this.router.navigate([`/pages/project/devSet/${data.id}`]);
  }

  showTestResultDetail(data) {
    this.router.navigate([`/pages/project/bug/${data.id}`]);
  }
}
