import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TimelineElement} from "../../../theme/components/horizontal-timeline/timeline-element";
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
  timeLine: TimelineElement[];
  content: string;
  title: string;
  isExpanded: boolean;
  constructor(private router: Router, private service: ReleaseManageService) {

    this.content = '';
    this.title = '';
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });

    this.isExpanded = false;

    this.timeLine = [
        {caption: "Mon Dec 18", content: "release content", date: new Date(2014, 1, 16), title: "release1", selected: true},
        {caption: "Mon Dec 18", content: "release content", date: new Date(2014, 1, 17), title: "release2"},
        {caption: "Mon Dec 18", content: "release content", date: new Date(2014, 1, 18), title: "release3"},
        {caption: "Mon Dec 18", content: "release 4 content", date: new Date(2014, 9, 19), title: "release 4"},
        {caption: "Mon Dec 18", content: "release 5 content", date: new Date(2015, 1, 20), title: "release 5"}
      ]
  }

  ngOnInit() {
    this.getReleaseList();
    console.log(new Date().getMonth(), new Date().getFullYear(), new Date().getDate())
  }

  getReleaseList() {
    this.service.getReleaseList()
      .then(res => {
        if (res.message === 'ok') {
          // this.timeLine = res.data;
          // this.timeLine.map(item => {
          //   return item.date = new Date(this.translateDate(item.date, 'YYYY'), this.translateDate(item.date, 'M'), this.translateDate(item.date, 'DD'))}
          //   );
          // this.timeLine[0].selected = true;
          // console.log(this.timeLine);
          // console.log(moment(this.timeLine[0].date).format('YYYY'));
          // console.log(moment(this.timeLine[0].date).format('DD'));
          // console.log(moment(this.timeLine[0].date).format('M'));
        }
      }, err => console.log(err));
  }

  create(form: any) {
    this.isExpanded = !this.isExpanded;
    this.service.createRelease(form.title, form.content, moment().format("MMM DD"))
      .then(res => {
        if (res.message === 'ok') {
          this.title = '';
          this.content = '';
        }
      }, err => console.log(err));
  }

  goToDashboard(item: any){
    this.router.navigate([`/pages/project/dashboard`]);
    sessionStorage.setItem('releaseId', '1');
  }

  setExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  translateDate(date: Date, format:string) {
    return Number(moment(date).format(format));
  }
}
