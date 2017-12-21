import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReleaseManageService} from "./release-manage.service";
import {MatDialog} from "@angular/material";
import {ReleaseCreateComponent} from "./release-create/release-create.component";

@Component({
  selector: 'app-release-manage',
  templateUrl: './release-manage.component.html',
  styleUrls: ['./release-manage.component.css']
})
export class ReleaseManageComponent implements OnInit {

  timeLine: any[];
  constructor(private router: Router, private service: ReleaseManageService, private dialogRef: MatDialog) {
    this.timeLine = [];

  }

  ngOnInit() {
    this.getReleaseList();
  }

  getReleaseList() {
    this.service.getReleaseList()
      .then(res => {
        if (res.message === 'ok') {
          this.timeLine = res.data;
        }
      }, err => console.log(err));
  }

  create(form: any) {

  }

  openDialog() {
    let dialog = this.dialogRef.open(ReleaseCreateComponent, {
      height: '320px',
      width: '600px',
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.getReleaseList();
      }
    });
  }

  goToDashboard(){
    this.router.navigate([`/pages/project/${window.sessionStorage.getItem('userRoleInProject')}/dashboard`]);
  }

}
