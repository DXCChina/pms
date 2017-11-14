import { Component, OnInit } from "@angular/core";
import { FormControl, Validators } from '@angular/forms';
import { DashboardService } from "./dashboard.service";
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  providers: [
    DashboardService
  ]
})
export class DashboardComponent implements OnInit {

  // 项目ID
  projectId: string

  // 保存现有数据
  userlist: any[] // 全部用户
  projectDetail: any // 项目详情
  projectUser: any[] // 项目成员

  // 修改后的数据
  detailData: any = {
    name: "",
    detail: ""
  } // 项目详情
  userData: any // 项目成员ID数组

  // 表单验证
  formControl: any;

  constructor(private router: Router, private service: DashboardService) {
  }

  ngOnInit() {
    this.projectId = sessionStorage.getItem('projectId');
    if (!this.projectId) {
      this.router.navigate(['/welcome']);
    } else {
      this.getData();
    }
    this.formControl = new FormControl(this.detailData.name, Validators.required);    
  }

  //初始化数据 调用三个接口
  getData() {
    this.getProjectDetail();
    this.getProjectUser();
    this.getUserlist();
  }

  // 获取全部用户
  getUserlist() {
    this.service.getUserlist()
      .then(res => {
        this.userlist = [];
        for (var index in res) {
          if (res.hasOwnProperty(index)) {
            this.userlist.push(res[index]);
          }
        }
      }).catch(err => console.log(err))
  }

  // 获取项目详情
  getProjectDetail() {
    this.service.getProjectDetail(this.projectId)
      .then(res => {
        this.projectDetail = Object.assign({}, res);
        this.detailData = Object.assign({}, res);
      }).catch(err => console.log(err))
  }

  // 获取项目成员
  getProjectUser() {
    this.service.getProjectUser(this.projectId)
      .then(res => {
        this.projectUser = Object.assign({}, res);
        this.userData = [];
        for (var index in res) {
          if (res.hasOwnProperty(index)) {
            this.userData.push(res[index].memberId);            
          }
        }
      }).catch(err => console.log(err))
  }

  // 修改项目详情
  putProjectDetail(detailData) {
    this.service.putProjectDetail(this.projectId, detailData)
      .then(res => {
        this.projectDetail = Object.assign({}, res);
        this.detailData = Object.assign({}, res);
      }).catch(err => console.log(err))
  }

  // 修改项目成员
  putProjectUser(userData) {
    this.service.putProjectUser(this.projectId, userData)
      .then(res => {
        this.projectUser = Object.assign({}, res);
        this.userData = [];
        for (var index in res) {
          if (res.hasOwnProperty(index)) {
            this.userData.push(res[index].memberId);
          }
        }
      }).catch(err => console.log(err))
  }

  // 取消修改项目详情
  cancelProject() {
    this.detailData = Object.assign({}, this.projectDetail);
  }

  // 更新项目详情
  updateProject() {
    this.putProjectDetail({
      name: this.detailData.name,
      detail: this.detailData.detail
    })
  }

  // 修改项目成员
  changeUser(newUser) {
    this.putProjectUser({memberIdArr:newUser})
  }

}
