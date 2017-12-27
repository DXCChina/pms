import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { JhiEventManager } from 'ng-jhipster';

import { TestSetService } from './test-set-detail.service';
import { TestSet } from './test-set-detail.model';
import { parse } from 'querystring';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-set-detail',
  templateUrl: './test-set-detail.component.html',
  styleUrls: ['test-set-detail.component.scss'],
  providers: [TestSetService]
})

export class TestSetDetailComponent implements OnInit {

  testSetInfo: TestSet = new TestSet();

  mode = '';

  caseName = '';

  constructor(private _service: TestSetService, private route: ActivatedRoute, private router: Router
  ) {
    this.route.queryParams.filter(params => params.type)
      .subscribe(params => {
        this.mode = params.type;
      });
  }

  ngOnInit() {
    if (this.mode !== 'new') {
      this.route.params.subscribe(param => {
        if (param['id']) {
          this.reviewDetail(param['id']);
        }
      });
    }
  }

  reviewDetail(testSetId) {
    this._service.reviewTestSet(testSetId)
      .then(res => {
        // if (res.mes !== 'ok') {
        //   this.router.navigate(['../'], { relativeTo: this.route });
        // } else {
        this.testSetInfo = res.data;
        // }
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
