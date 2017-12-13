import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
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
  name: AbstractControl;
  detail: AbstractControl;
  caseId: AbstractControl;
  output: AbstractControl;
  status: AbstractControl;
  level: AbstractControl;
  priority: AbstractControl;

  testResultForm: FormGroup;

  formErrors = {
    'name': '',
    'detail': '',
    'caseId': '',
    'output': '',
    'status': '',
    'level': '',
    'priority': ''
  };

  validationMessages = {
    'name': {
      'required': '请输入测试结果名称'
    },
    'detail': {},
    'caseId': {
      'required': '请选择测试结果相关案例'
    },
    'output': {
      'required': '请输入测试结果输出'
    },
    'status': {
      'required': '请选择测试结果状态'
    },
    'level': {},
    'priority': {}
  };

  mode: string;
  projectId: number;

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  testResultInfo: TestResult = new TestResult();

  constructor(
    public dialogRef: MatDialogRef<TestResultDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    private _service: TestResultService,
    private toasterService: ToasterService,
    private eventManager: JhiEventManager
  ) {
    this.mode = this.data.mode;
    this.projectId = parseInt(sessionStorage.getItem('projectId'), 10);
  }

  ngOnInit() {
    if (this.mode === 'update') {
      this.testResultInfo = this.data.info;
      this.reviewDetail(this.data.info.id);
    }
    this.buildForm();
  }

  reviewDetail(testResultId) {
    this._service.reviewTestResult(testResultId)
      .then(res => {
        this.testResultInfo = res.data;
      });
  }

  buildForm() {
    this.testResultForm = this.fb.group({
      'name': [this.testResultInfo.name, Validators.compose([Validators.required])],
      'detail': [this.testResultInfo.detail, Validators.compose([])],
      'caseId': [this.testResultInfo.caseId, Validators.compose([Validators.required])],
      'output': [this.testResultInfo.output, Validators.compose([Validators.required])],
      'status': [this.testResultInfo.status, Validators.compose([Validators.required])],
      'level': [this.testResultInfo.level, Validators.compose([])],
      'priority': [this.testResultInfo.priority, Validators.compose([])]
    });

    this.name = this.testResultForm.controls['name'];
    this.detail = this.testResultForm.controls['detail'];
    this.caseId = this.testResultForm.controls['caseId'];
    this.output = this.testResultForm.controls['output'];
    this.status = this.testResultForm.controls['status'];
    this.level = this.testResultForm.controls['level'];
    this.priority = this.testResultForm.controls['priority'];

    this.testResultForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.testResultForm) {
      return;
    }
    const form = this.testResultForm;
    for (const field in this.formErrors) {
      if (field) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (key) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit(data) {
    let testResultInfo = Object.assign(this.testResultForm.value, {});
    testResultInfo.level = testResultInfo.level || 'normal';
    testResultInfo.priority = testResultInfo.priority || 'normal';
    if (this.mode === 'create') {
      this._service.newTestResult(testResultInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({ name: 'TestResultModification', content: 'OK' });
            this.toasterService.pop('ok', '新建测试结果成功');
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    } else if (this.mode === 'update') {
      testResultInfo = Object.assign(testResultInfo, { id: this.testResultInfo.id });
      this._service.updateTestResult(testResultInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({ name: 'TestResultModification', content: 'OK' });
            this.toasterService.pop('ok', '测试结果修改成功');
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });

    }
  }
}
