import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material";
import {TaskDetailDialogComponent} from "../task-detail-dialog/task-detail-dialog.component";
import {DemandDetailDialogComponent} from "../demand-detail-dialog/demand-detail-dialog.component";

@Component({
  selector: 'pm-dashboard',
  templateUrl: './pm-dashboard.component.html',
  styleUrls: ['./pm-dashboard.component.scss']
})

export class PmDashboardComponent implements OnInit {

  public data1: any[] = [{
    listName: '全部需求',
    listData: [ {
      itemName: 'aaa',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }, {
      itemName: 'bbb',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }, {
      itemName: 'ccc',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }]
  }, {
    listName: '已分配需求',
    listData: [{
      itemName: 'aaa',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }, {
      itemName: 'ccc',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }]
  }, {
    listName: '待处理需求',
    listData: [{
      itemName: 'bbb',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }]
  }];

  public data2: any[] = [{
    listName: '全部任务',
    listData: [ {
      itemName: 'AAA',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }, {
      itemName: 'BBB',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }, {
      itemName: 'CCC',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }]
  }, {
    listName: '已完成任务',
    listData: [{
      itemName: 'BBB',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }, {
      itemName: 'CCC',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }]
  }, {
    listName: '待测试任务',
    listData: [{
      itemName: 'AAA',
      itemTime: '2017-11-21',
      itemlabel: '',
      itemfrom: 'Wang Qianxiang'
    }]
  }];

  constructor() { }

  ngOnInit() { }

  addItem() {
    console.log('add');
  }

  showDetail(item) {
    console.log('show:', item);
  }
  
   initDemand(){
    let dialogRef = this.dialog.open(DemandDetailDialogComponent, {
      width: '750px',
      height:'70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  initActivity(){
    let dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '750px',
      height:'70vh',
      data: { name: 'dd', animal: 'dd' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
