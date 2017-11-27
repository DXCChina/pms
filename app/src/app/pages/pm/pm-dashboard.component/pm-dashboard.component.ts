import { Component, OnInit } from '@angular/core';
import { PmDashboardService } from './pm-dashboard.service';
import { Router } from '@angular/router';

import { ListMetrics, ItemMetrics } from './card-data.Entity';
import { MatDialog } from '@angular/material';
import { TaskDetailDialogComponent } from '../task-detail-dialog/task-detail-dialog.component';
import { DemandDetailDialogComponent } from '../demand-detail-dialog/demand-detail-dialog.component';

@Component({
  selector: 'app-pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.scss'],
  providers: [
    PmDashboardService
  ]
})

export class PmDashboardComponent implements OnInit {

  public data1: any[] = [{
    listName: '全部需求',
    listData: [{
      itemName: 'aaa',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '',
      itemLevel: 3
    }, {
      itemName: 'bbb',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '',
      itemLevel: 1
    }, {
      itemName: 'ccc',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '',
      itemLevel: 2
    }]
  }, {
    listName: '已分配需求',
    listData: [{
      itemName: 'aaa',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '',
      itemLevel: 3
    }, {
      itemName: 'ccc',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '',
      itemLevel: 2
    }]
  }, {
    listName: '待处理需求',
    listData: [{
      itemName: 'bbb',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '',
      itemLevel: 1
    }]
  }];

  public data2: any[] = [{
    listName: '全部任务',
    listData: [{
      itemName: 'AAA',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '6/6'
    }, {
      itemName: 'BBB',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '3/6'
    }, {
      itemName: 'CCC',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '1/6'
    }]
  }, {
    listName: '进行中任务',
    listData: [{
      itemName: 'BBB',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '3/6'
    }, {
      itemName: 'CCC',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '1/6'
    }]
  }, {
    listName: '待测试任务',
    listData: [{
      itemName: 'AAA',
      itemTime: '2017-11-21',
      itemfrom: 'Wang Qianxiang',
      itemToDo: '6/6'
    }]
  }];

  public demandData: any[] = [];
  public activityData: any[] = [];
  public testResultData: any[] = [];

  constructor(private router: Router, private service: PmDashboardService, private dialog: MatDialog) { }

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
                return new ItemMetrics(i.id, i.title, i.createAt, '', i.detail, '', i.level);
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
                return new ItemMetrics(i.id, i.title, i.createAt, '', i.detail, '', i.level);
              })
          )
        );

        this.demandData.push(
          new ListMetrics(
            '全部需求',
            res
              .map(i => {
                return new ItemMetrics(i.id, i.title, i.createAt, '', i.detail, '', i.level);
              })
          )
        );

      }).catch(err => console.log(err));
  }

  getProjectActivity() {
    this.service.getProjectActivity(this.projectId)
      .then(res => {
        this.activityData.push(
          {
            listName: '进行中活动',
            listData: res.filter(el => {
              return el.status === 'dev-ing';
            })
          }
        );
        this.activityData.push(
          {
            listName: '待测试活动',
            listData: res.filter(el => {
              return el.status === 'needtest';
            })
          }
        );
        this.activityData.push(
          {
            listName: '全部活动',
            listData: res
          }
        );
      }).catch(err => console.log(err));
  }

  getProjectTestResult() {
    this.service.getProjectTestResult(this.projectId)
      .then(res => {
        res = res;
        this.testResultData.push(
          {
            listName: '待修复测试结果',
            listData: res.filter(el => {
              return el.status === 'tofix';
            })
          }
        );
        this.testResultData.push(
          {
            listName: '待审核测试结果',
            listData: res.filter(el => {
              return el.status === 'tocheck';
            })
          }
        );
        this.testResultData.push(
          {
            listName: '已通过测试结果',
            listData: res.filter(el => {
              return el.status === 'close';
            })
          }
        );
      }).catch(err => console.log(err));
  }

  addItem() {
    console.log('add');
  }

  showDemandDetail() {
    const dialogRef = this.dialog.open(DemandDetailDialogComponent, {
      width: '750px',
      height: '70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  showTaskDetail() {
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
