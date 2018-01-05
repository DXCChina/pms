import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListMetrics, ItemMetrics } from './card-data.Entity';
import { RoleModel } from './role.model';
import { DashboardViewService } from './dashboard-view.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.scss'],
  providers: [DashboardViewService]
})

export class DashboardViewComponent implements OnInit {
  public demandData: any[] = [];
  public devSetData: any[] = [];
  public testCaseData: any[] = [];
  public testSetData: any[] = [];
  public bugData: any[] = [];

  private releaseId: string;
  private role: string;
  public RoleModel = RoleModel;

  constructor(
    private router: Router,
    private service: DashboardViewService
  ) { }

  ngOnInit() {
    this.releaseId = sessionStorage.getItem('releaseId');
    this.role = sessionStorage.getItem('userRoleInProject');

    if (!this.releaseId || !this.role) {
      this.router.navigate(['/welcome']);
    } else {
      this.initData();
    }
  }

  // 初始化数据
  initData() {
    this.RoleModel[this.role].forEach(type => {
      this[type.name]();
    });
  }

  demand() {
    this.service.getViewData(this.releaseId, 'demand')
      .then(res => {
        this.demandData = [];

        this.demandData.push(
          new ListMetrics(
            '需求',
            res.map(i => new ItemMetrics(i, i.title, i.activity, i.status ? '已完成' : '未完成', [i.level], i.createAt))
          )
        );

      }).catch(err => console.log(err));
  }

  devSet() {
    this.service.getViewData(this.releaseId, 'activity')
      .then(res => {
        this.devSetData = [];

        this.devSetData.push(
          new ListMetrics(
            '活动',
            res.map(i => new ItemMetrics(i, i.title, '', i.status, [], i.createAt))
          )
        );

      }).catch(err => console.log(err));
  }

  testCase() {
    this.service.getViewData(this.releaseId, 'testCase')
      .then(res => {
        this.testCaseData = [];

        this.testCaseData.push(
          new ListMetrics(
            '测试案例',
            res.map(i => new ItemMetrics(i, i.name, i.owner, i.status, [i.type], ''))
          )
        );

      }).catch(err => console.log(err));
  }

  testSet() {
    this.service.getViewData(this.releaseId, 'testSet')
      .then(res => {
        this.testSetData = [];

        this.testSetData.push(
          new ListMetrics(
            '测试集',
            res.map(i => new ItemMetrics(i, i.name, i.member, '', i.testCase.map(el => el.name), ''))
          )
        );

      }).catch(err => console.log(err));
  }

  bug() {
    this.service.getViewData(this.releaseId, 'testResult')
      .then(res => {
        this.bugData = [];

        this.bugData.push(
          new ListMetrics(
            '缺陷',
            res.map(i => new ItemMetrics(
              i, i.name, i.owner,
              i.status === 'tofix' ? '待修复' : '已修复',
              ['所属：' + i.testSet + ' > ' + i.testCase],
              ''
            ))
          )
        );

      }).catch(err => console.log(err));
  }

  addItem(type) {
    this.router.navigate([`/pages/project/${type}/new`]);
  }

  showDetail(type, data) {
    this.router.navigate([`/pages/project/${type}/${data.id}`]);
  }

}
