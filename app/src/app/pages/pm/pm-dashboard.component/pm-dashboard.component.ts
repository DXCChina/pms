import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ListMetrics, ItemMetrics} from './card-data.Entity';
import {DashboardService} from './dashboard.service';
import {MatDialog} from '@angular/material';
import {TaskDetailDialogComponent} from '../task-detail-dialog/task-detail-dialog.component';
import {DemandDetailDialogComponent} from '../demand-detail-dialog/demand-detail-dialog.component';
import {Subscription} from "rxjs";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'app-pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.scss']
})

export class PmDashboardComponent implements OnInit, OnDestroy {
  public demandData: any[] = [];
  public activityData: any[] = [];
  public testResultData: any[] = [];

  private eventSubscriber: Subscription;

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

  // 初始化数据 调用三个接口
  initData() {
    this.getProjectDemand();
    this.getProjectActivity();
    this.getProjectTestResult();

    this.registerChangeInDemand();
  }

  getProjectDemand() {
    this.service.getProjectDemand(this.projectId)
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

  registerChangeInDemand() {
    this.eventSubscriber = this.eventManager.subscribe(
      'DemandListModification',
      () => this.getProjectDemand()
    );
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  addItem() {
    console.log('add');
  }

  addDemand() {
    const dialogRef = this.dialog.open(DemandDetailDialogComponent, {
      width: '750px',
      data: {mode: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showDemandDetail(data) {
    console.log(data);

    const dialogRef = this.dialog.open(DemandDetailDialogComponent, {
      width: '750px',
      data: {mode: 'update', info: data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  addTask(){
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '750px',
      data: {mode: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showTaskDetail(data) {
    console.log(data);

    const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '750px',
      data: {mode:'update', taskInfo:data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
