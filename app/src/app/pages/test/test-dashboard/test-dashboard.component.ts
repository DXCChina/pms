import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListMetrics, ItemMetrics } from '../../pm/pm-dashboard.component/card-data.Entity';
import { DashboardService } from '../../pm/pm-dashboard.component/dashboard.service';
import { MatDialog } from '@angular/material';
import { TaskDetailDialogComponent } from '../../pm/task-detail-dialog/task-detail-dialog.component';
import { DemandDetailDialogComponent } from '../../pm/demand-detail-dialog/demand-detail-dialog.component';

@Component({
  selector: 'app-test-dashboard',
  templateUrl: './test-dashboard.component.html',
  styleUrls: ['./test-dashboard.component.scss']
})

export class TestDashboardComponent implements OnInit {

  public demandData: any[] = [];
  public activityData: any[] = [];
  public testResultData: any[] = [];

  constructor(private router: Router, private service: DashboardService, private dialog: MatDialog) { }

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
    this.getProjectDemand();
    this.getProjectActivity();
    this.getProjectTestResult();
  }

  getProjectDemand() {
    this.service.getProjectDemand(this.projectId)
      .then(res => {

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

  addItem() {
    console.log('add');
  }

  showDemandDetail(data) {
    console.log(data);

    const dialogRef = this.dialog.open(DemandDetailDialogComponent, {
      width: '750px',
      height: '70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showTaskDetail(data) {
    console.log(data);

    const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '750px',
      height: '70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
