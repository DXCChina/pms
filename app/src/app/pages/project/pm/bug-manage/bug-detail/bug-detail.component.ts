import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router , NavigationEnd} from '@angular/router';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';

import { ToasterService, ToasterConfig } from 'angular2-toaster';

import {TestResultService} from './test-result-detail-dialog.service';
import {TestResult} from './test-result.model';

@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['bug-detail.component.scss'],
  providers: [TestResultService]
})

export class BugDetailComponent implements OnInit {
  name: AbstractControl;
  detail: AbstractControl;
  setId: AbstractControl;
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
    'setId': '',
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
    'setId': {
      'required': '请选择相关测试集'
    },
    'caseId': {
      'required': '请选择相关测试案例'
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
  releaseId: number;

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  testResultInfo: TestResult = new TestResult();

  options: any = {
    imageUploadURL: '/api/upload',
    toolbarButtons: ['bold', 'italic', 'underline', 'align', 'fontSize', 'color', 'indent', 'outdent', 'formatOL', 'formatUL']
  };

  searchSetList: any[] = [];
  searchCaseList: any[] = [];

  constructor(public fb: FormBuilder,
    private _service: TestResultService,
    private toasterService: ToasterService,
    private route: ActivatedRoute, private router: Router) {
    this.projectId = parseInt(sessionStorage.getItem('projectId'), 10);
    this.releaseId = parseInt(sessionStorage.getItem('releaseId'), 10);

    this.route.url.subscribe(url => {
      this.mode = url[0].path
    });
  }

  ngOnInit() {
    if (this.mode != 'new') {
      this.route.params.subscribe(param => {
        if (param['id']) {
          this.reviewDetail(param['id']);
        }
      });
    }
    this.findTestSet();
    this.buildForm();
  }

  reviewDetail(testResultId) {
    this._service.reviewTestResult(testResultId)
      .then(res => {
        this.testResultInfo = res.data;
        this.findTestCase(this.testResultInfo.setId);
      });
  }

  findTestSet() {
    this._service.searchTestSet(this.releaseId)
        .then(res => {
          if (res.msg === 'ok') {
            this.searchSetList = res.data;
          }
        });
  }

  findTestCase(setId) {
    this._service.searchTestCase(setId, this.releaseId)
        .then(res => {
          if (res.msg === 'ok') {
            this.searchCaseList = res.data;
          }
        });
  }

  changeTestSet(setId) {
    this.findTestCase(setId);
    this.testResultInfo.caseId = NaN;
  }

  buildForm() {
    this.testResultForm = this.fb.group({
      'name': [this.testResultInfo.name, Validators.compose([Validators.required])],
      'detail': [this.testResultInfo.detail, Validators.compose([])],
      'setId': [this.testResultInfo.setId, Validators.compose([Validators.required])],
      'caseId': [this.testResultInfo.caseId, Validators.compose([Validators.required])],
      'output': [this.testResultInfo.output, Validators.compose([Validators.required])],
      'status': [this.testResultInfo.status, Validators.compose([Validators.required])],
      'level': [this.testResultInfo.level, Validators.compose([])],
      'priority': [this.testResultInfo.priority, Validators.compose([])]
    });

    this.name = this.testResultForm.controls['name'];
    this.detail = this.testResultForm.controls['detail'];
    this.setId = this.testResultForm.controls['setId'];
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

  onSubmit(type) {
    let testResultInfo = Object.assign(this.testResultForm.value, { releaseId: this.releaseId, projectId: this.projectId });
    testResultInfo.level = testResultInfo.level || 'normal';
    testResultInfo.priority = testResultInfo.priority || 'normal';
    if (this.mode === 'new') {
      this.newTestResult(testResultInfo, type);
    } else {
      testResultInfo = Object.assign(testResultInfo, {id: this.testResultInfo.id});
      this.updateTestResult(testResultInfo);
    }
  }

  newTestResult(testResultInfo, type) {
    this._service.newTestResult(testResultInfo)
      .then(res => {
        if (res.msg === 'ok') {
          this.toasterService.pop('ok', '新建测试结果成功');
          if (type == 'one') {
            this.router.navigate(['../'], {relativeTo: this.route});
          } else if (type == 'again') {
            this.router.navigate(['../new'], {relativeTo: this.route});
          }
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }

  updateTestResult(testResultInfo) {
    this._service.updateTestResult(testResultInfo)
      .then(res => {
        if (res.msg === 'ok') {
          this.toasterService.pop('ok', '测试结果修改成功');
          this.router.navigate(['../'], {relativeTo: this.route});
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}

