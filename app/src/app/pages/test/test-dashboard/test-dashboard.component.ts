import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListMetrics, ItemMetrics } from '../../pm/pm-dashboard.component/card-data.Entity';
import { DashboardService } from '../../pm/pm-dashboard.component/dashboard.service';
import { MatDialog } from '@angular/material';
import { CaseDetailModalComponent } from '../case-detail-modal/case-detail-modal.component';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { TestTaskDetailDialogComponent } from '../case-task-detail-dialog/task-detail-dialog.component';
import { TestResultDetailComponent } from '../test-result-detail-dialog/test-result-detail-dialog.component';

@Component({
  selector: 'app-test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.scss']
})
export class TestDashboardComponent implements OnInit {

  public activityData: any[] = [];
  public testCaseData: any[] = [];
  public testResultData: any[] = [];

  private eventTestCaseSubscriber: Subscription;
  private eventActivitySubscriber: Subscription;
  private eventTestResultSubscriber: Subscription;

  constructor(private router: Router, private service: DashboardService, private dialog: MatDialog, private eventManager: JhiEventManager) { }

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

  // 初始化数据 调用三个接口
  initData() {
    this.getProjectActivity();
    this.getProjectTestCase();
    this.getProjectTestResult();

    this.registerChangeInTestCase();
    this.registerChangeInActivity();
    this.registerChangeInTestResult();
  }

  getProjectActivity() {
    this.service.getProjectActivity(this.projectId)
      .then(res => {

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

  getProjectTestCase() {
    this.service.getProjectTestCase(this.projectId)
      .then(res => {

        this.testCaseData = [];
        this.testCaseData.push(
          new ListMetrics(
            '全部测试案例',
            res
              .map(i => {
                return new ItemMetrics(i, i.name, '', i.detail, '', '');
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

  registerChangeInTestCase() {
    this.eventTestCaseSubscriber = this.eventManager.subscribe(
      'TestCaseListModification',
      () => this.getProjectTestCase()
    );
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

  showActivityDetail(data) {
    const dialogRef = this.dialog.open(TestTaskDetailDialogComponent, {
      width: '750px',
      data: { data: data }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addCase() {
    const dialogRef = this.dialog.open(CaseDetailModalComponent, {
      width: '750px',
      height: '61vh',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showCaseDetail(data) {
    const dialogRef = this.dialog.open(CaseDetailModalComponent, {
      width: '750px',
      height: '61vh',
      data: { mode: 'update', caseInfo: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addTestResult() {
    const dialogRef = this.dialog.open(TestResultDetailComponent, {
      width: '750px',
      data: { mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
