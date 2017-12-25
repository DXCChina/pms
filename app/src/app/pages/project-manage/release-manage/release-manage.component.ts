import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReleaseManageService} from "./release-manage.service";
import {MatDialog} from "@angular/material";
import {ReleaseCreateComponent} from "./release-create/release-create.component";
import {CommonDeleteDialog} from "../../../theme/components/deleteDialog/deleteDialog.component";

@Component({
  selector: 'app-release-manage',
  templateUrl: './release-manage.component.html',
  styleUrls: ['./release-manage.component.css']
})
export class ReleaseManageComponent implements OnInit {

  timeLine: any[];
  release: any;
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

  deleteRelease(release: any) {
    this.service.deleteRelease(release.id)
      .then(res => {
        if (res.message === 'ok') {
          this.getReleaseList();
          console.log('Delete Successful!');
        }
      }, err => console.log(err))
  }

  updateDialog(item: any) {
    let dialog = this.dialogRef.open(ReleaseCreateComponent, {
      height: '320px',
      width: '600px',
      data: {
        title: item.title,
        content: item.content,
        id: item.id
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.getReleaseList()
      }
    });
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

  deleteDialog(item: any) {
     let dialog = this.dialogRef.open(CommonDeleteDialog, {
       height: '220px',
        width: '400px',
        data: 'Release'
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRelease(item);
      }
    });
  }

  goToDashboard(item: any){
    this.router.navigate([`/pages/project/dashboard`]);
    sessionStorage.setItem('releaseId', item.id);
  }

}
