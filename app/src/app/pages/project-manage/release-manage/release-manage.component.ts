import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TimelineElement} from "../../../theme/components/horizontal-timeline/timeline-element";

@Component({
  selector: 'app-release-manage',
  templateUrl: './release-manage.component.html',
  styleUrls: ['./release-manage.component.css']
})
export class ReleaseManageComponent implements OnInit {

  timeline: TimelineElement[];
  content: string;
  isExpanded: boolean;
  constructor(private router:Router) {
    this.isExpanded = false;
    this.content = 'Lorme 111';
    this.timeline = [
      { caption: '16 Jan', date: new Date(2014, 1, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
      { caption: '28 Feb', date: new Date(2014, 2, 28), title: 'Event title here', content: this.content },
      { caption: '20 Mar', date: new Date(2014, 3, 20), title: 'Event title here', content: this.content },
      { caption: '20 May', date: new Date(2014, 5, 20), title: 'Event title here', content: this.content },
      { caption: '09 Jul', date: new Date(2014, 7, 9), title: 'Event title here', content: this.content },
      { caption: '30 Aug', date: new Date(2014, 8, 30), title: 'Event title here', content: this.content },
      { caption: '15 Sep', date: new Date(2014, 9, 15), title: 'Event title here', content: this.content },
      { caption: '01 Nov', date: new Date(2014, 11, 1), title: 'Event title here', content: this.content },
      { caption: '10 Dec', date: new Date(2014, 12, 10), title: 'Event title here', content: this.content },
      { caption: '29 Jan', date: new Date(2015, 1, 19), title: 'Event title here', content: this.content },
      { caption: '3 Mar', date: new Date(2015, 3, 3), title: 'Event title here', content: this.content },
    ]
  }

  ngOnInit() {
  }

  goToDashboard(item: any){
    this.router.navigate([`/pages/project/${window.sessionStorage.getItem('userRoleInProject')}/dashboard`]);
  }

  setExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
