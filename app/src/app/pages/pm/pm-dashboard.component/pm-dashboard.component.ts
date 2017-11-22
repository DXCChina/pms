import { Component, OnInit } from '@angular/core';

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

}
