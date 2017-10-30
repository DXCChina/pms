import { Component, ElementRef, OnInit } from "@angular/core";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  providers: [
    DashboardService
  ]
})
export class DashboardComponent implements OnInit {

  projectId: string = "1"
  Userlist:any ={}
  projectDetail: any = {}
  projectUser: any = {}
  detailData: any = {
    name: "项目A",
    detail: "这是项目AA",
    ownerId: 1,
    status: "active"
  }
  userData: any = {
    memberIdArr: [1]
  }

  constructor(private ref: ElementRef, private service: DashboardService) {
  }

  ngOnInit() {
    localStorage.setItem('projectId', this.projectId);
    localStorage.setItem('ownerId', '1');
    this.getData();
  }

  getData() {
    this.getProjectDetail();
    this.getProjectUser();
  }
  
  getUserlist() {
    this.service.getUserlist()
      .then(res => {
        this.Userlist = JSON.stringify(res);
      }).catch(err => console.log(err))
  }

  getProjectDetail() {
    this.service.getProjectDetail(this.projectId)
      .then(res => {
        this.projectDetail = JSON.stringify(res);
      }).catch(err => console.log(err))
  }

  getProjectUser() {
    this.service.getProjectUser(this.projectId)
      .then(res => {
        this.projectUser = JSON.stringify(res);
      }).catch(err => console.log(err))
  }

  putProjectDetail() {
    this.service.putProjectDetail(this.projectId, this.detailData)
      .then(res => {
        this.projectDetail = JSON.stringify(res);
      }).catch(err => console.log(err))
  }

  putProjectUser() {
    this.service.putProjectUser(this.projectId, this.userData)
      .then(res => {
        this.projectUser = JSON.stringify(res);
      }).catch(err => console.log(err))
  }

}
