import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-release-manage',
  templateUrl: './release-manage.component.html',
  styleUrls: ['./release-manage.component.css']
})
export class ReleaseManageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  goTo(){
    this.router.navigate([`/pages/project/${window.sessionStorage.getItem('userRoleInProject')}/dashboard`]);
    sessionStorage.setItem('releaseId', '1');
  }
}
