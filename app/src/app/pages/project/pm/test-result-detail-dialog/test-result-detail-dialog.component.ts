import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { TestResultService } from './test-result-detail-dialog.service';
import { TestResult } from './test-result.model';

@Component({
  selector: 'app-test-result-detail-dialog',
  templateUrl: './test-result-detail-dialog.component.html',
  styleUrls: ['./test-result-detail-dialog.component.scss'],
  providers: [TestResultService]
})
export class TestResultDetailComponent implements OnInit {

  testResultInfo: TestResult = new TestResult();

  constructor(
    public dialogRef: MatDialogRef<TestResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: TestResultService
  ) {  }

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
}
