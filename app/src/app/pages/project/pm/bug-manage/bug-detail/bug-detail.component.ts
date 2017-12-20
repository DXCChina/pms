import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { JhiEventManager } from 'ng-jhipster';

import { TestResultService } from './test-result-detail-dialog.service';
import { TestResult } from './test-result.model';
import { parse } from 'querystring';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['bug-detail.component.scss'],
  providers:[TestResultService]
})

export class BugDetailComponent implements OnInit {

  testResultInfo: TestResult = new TestResult();
  mode: string = '';

  constructor(private _service: TestResultService, private route: ActivatedRoute, private router:Router
  ) {
    this.route.queryParams.filter(params => params.type)
      .subscribe(params => {
        this.mode = params.type;
      })
  }

  ngOnInit() {
    if (this.mode != 'new') {
      this.route.params.subscribe(param => {
        if (param['id']) {
          this.reviewDetail(param['id']);
        }
      });
    }
  }

  reviewDetail(testResultId) {
    this._service.reviewTestResult(testResultId)
      .then(res => {
        this.testResultInfo = res.data;
      });
  }

  cancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
