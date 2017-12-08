import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { JhiEventManager } from 'ng-jhipster';

import { TestResultService } from './test-result-detail-dialog.service';
import { TestResult } from './test-result.model';
import { parse } from 'querystring';

@Component({
  selector: 'app-test-result-detail-dialog',
  templateUrl: './test-result-detail-dialog.component.html',
  styleUrls: ['./test-result-detail-dialog.component.scss'],
  providers: [TestResultService]
})
export class TestResultDetailComponent implements OnInit {

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  testResultInfo: TestResult = new TestResult();

  constructor(
    public dialogRef: MatDialogRef<TestResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: TestResultService,
    private toasterService: ToasterService,
    private eventManager: JhiEventManager
  ) { }

  ngOnInit() {
    this.testResultInfo = this.data.info;
    this.reviewDetail(this.data.info.id);
  }

  reviewDetail(testResultId) {
    this._service.reviewTestResult(testResultId)
      .then(res => {
        this.testResultInfo = res.data;
      });
  }

  onSubmit(data) {
    this.testResultInfo.status = 'tocheck';
    this._service.updateTestResult(this.testResultInfo)
      .then(res => {
        if (res.msg === 'ok') {
          this.eventManager.broadcast({ name: 'TestResultModification', content: 'OK' });
          this.toasterService.pop('ok', '测试结果提交成功');
          this.dialogRef.close();
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }
}
