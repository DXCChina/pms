import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReleaseManageService} from "./release-manage.service";
import * as moment from 'moment';

@Component({
  selector: 'app-release-manage',
  templateUrl: './release-manage.component.html',
  styleUrls: ['./release-manage.component.css'],
  providers: [ReleaseManageService]
})
export class ReleaseManageComponent implements OnInit {

  form: FormGroup;
  timeLine: any[];
  content: string;
  title: string;
  constructor(private router: Router, private service: ReleaseManageService) {

    this.content = '';
    this.title = '';
    this.timeLine = [];
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });
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
    this.service.createRelease(form.title, form.content) //, moment().format("MMM DD")
      .then(res => {
        if (res.message === 'ok') {
          this.title = '';
          this.content = '';
        }
      }, err => console.log(err));
  }

  goToDashboard(){
    this.router.navigate([`/pages/project/${window.sessionStorage.getItem('userRoleInProject')}/dashboard`]);
  }

}
