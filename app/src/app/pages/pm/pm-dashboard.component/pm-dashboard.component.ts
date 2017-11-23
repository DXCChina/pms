import { Component, OnInit } from '@angular/core';
import { PmDashboardService } from './pm-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pm-dashboard',
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
    listData: [{
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

  constructor(private router: Router, private service: PmDashboardService) { }

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
    this.getUserlist();
  }

  // 获取全部用户
  getUserlist() {
    this.service.getUserlist()
      .then(res => {
        console.log(res);
      }).catch(err => console.log(err));
  }

  addItem() {
    console.log('add');
  }

  showDetail(item) {
    console.log('show:', item);
  }

}
