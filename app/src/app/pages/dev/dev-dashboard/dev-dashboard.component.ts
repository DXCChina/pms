import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ListMetrics, ItemMetrics } from '../../pm/pm-dashboard.component/card-data.Entity';
import { DashboardService } from '../../pm/pm-dashboard.component/dashboard.service';
import { MatDialog } from '@angular/material';
import { DevTaskDetailDialogComponent } from '../dev-task-detail-dialog/task-detail-dialog.component';
import { TestResultDetailComponent } from '../test-result-detail-dialog/test-result-detail-dialog.component';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
// import { DemandDetailModalComponent } from '../demand-detail-modal/demand-detail-modal.component';

@Component({
  selector: 'app-dev-dashboard',
  templateUrl: './dev-dashboard.component.html',
  styleUrls: ['./dev-dashboard.component.scss']
})

export class DevDashboardComponent implements OnInit, OnDestroy {

  public activityData: any[] = [];
  public testResultData: any[] = [];

  private eventActivitySubscriber: Subscription;
  private eventTestResultSubscriber: Subscription;

  constructor(private router: Router, private service: DashboardService, private dialog: MatDialog, private eventManager: JhiEventManager) {
  }

  // 项目ID
  projectId: string;

  ngOnInit() {
    this.projectId = sessionStorage.getItem('projectId');
    if (!this.projectId) {
      this.router.navigate(['/welcome']);
    } else {
      this.initData();
    }
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventActivitySubscriber);
  }

  // 初始化数据 调用两个接口
  initData() {
    this.getProjectActivity();
    this.getProjectTestResult();

    this.registerChangeInActivity();
    this.registerChangeInTestResult();
  }

  getProjectActivity() {
    this.service.getProjectActivity(this.projectId)
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
                return new ItemMetrics(i, i.title, i.createAt, i.memberName, '', '');
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
                return new ItemMetrics(i, i.title, i.createAt, i.memberName, '', '');
              })
          )
        );

        this.activityData.push(
          new ListMetrics(
            '全部活动',
            res
              .map(i => {
                return new ItemMetrics(i, i.title, i.createAt, i.memberName, '', '');
              })
          )
        );

      }).catch(err => console.log(err));
  }

  getProjectTestResult() {
    this.service.getProjectTestResult(this.projectId)
      .then(res => {

        this.testResultData.push(
          new ListMetrics(
            '待修复测试结果',
            res
              .filter(i => {
                return i.status === 'tofix';
              })
              .map(i => {
                return new ItemMetrics(i, i.name, '', i.ownerName, '', i.level);
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
                return new ItemMetrics(i, i.name, '', i.ownerName, '', i.level);
              })
          )
        );

        this.testResultData.push(
          new ListMetrics(
            '已通过测试结果',
            res
              .map(i => {
                return new ItemMetrics(i, i.name, '', i.ownerName, '', i.level);
              })
          )
        );

      }).catch(err => console.log(err));
  }

  registerChangeInActivity() {
    this.eventActivitySubscriber = this.eventManager.subscribe(
      'ActivityListModification',
      () => this.getProjectActivity()
    );
  }

  registerChangeInTestResult() {
    this.eventTestResultSubscriber = this.eventManager.subscribe(
      'TestResultListModification',
      () => this.getProjectTestResult()
    );
  }

  addItem() {
    console.log('add');
  }

  // showDemandDetail(data) {
  //   const dialogRef = this.dialog.open(DemandDetailModalComponent, {
  //     width: '750px',
  //     height: '61vh',
  //     data: data
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
  // }

  showActivityDetail(data) {
    const dialogRef = this.dialog.open(DevTaskDetailDialogComponent, {
      width: '750px',
      data: { data: data }
    });
  }

  showTestResultDetail(data) {
    console.log(data);

    const dialogRef = this.dialog.open(TestResultDetailComponent, {
      width: '750px',
      data: { mode: 'update', info: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
