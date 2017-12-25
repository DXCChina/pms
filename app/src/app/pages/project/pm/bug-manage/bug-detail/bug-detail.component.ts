import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Validators, AbstractControl, FormGroup, FormBuilder} from '@angular/forms';
import {ToasterService, ToasterConfig} from 'angular2-toaster';
import {JhiEventManager} from 'ng-jhipster';

import {TestResultService} from './test-result-detail-dialog.service';
import {TestResult} from './test-result.model';
import {parse} from 'querystring';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: ['bug-detail.component.scss'],
  providers: [TestResultService]
})

export class BugDetailComponent implements OnInit {
  name: AbstractControl;
  detail: AbstractControl;
  caseId: AbstractControl;
  testSetId: AbstractControl;
  output: AbstractControl;
  status: AbstractControl;
  level: AbstractControl;
  priority: AbstractControl;

  testResultForm: FormGroup;

  formErrors = {
    'name': '',
    'detail': '',
    'caseId': '',
    'testSetId': '',
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
    'testSetId': {
      'required': '请选择测试结果相关测试集'
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

  constructor(public fb: FormBuilder,
              private _service: TestResultService,
              private toasterService: ToasterService,
              private eventManager: JhiEventManager,
              private route: ActivatedRoute, private router: Router) {
    this.projectId = parseInt(sessionStorage.getItem('projectId'), 10);
    this.releaseId = parseInt(sessionStorage.getItem('releaseId'), 10);

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
      'testSetId': [this.testResultInfo.testSetId, Validators.compose([Validators.required])],
      'output': [this.testResultInfo.output, Validators.compose([Validators.required])],
      'status': [this.testResultInfo.status, Validators.compose([Validators.required])],
      'level': [this.testResultInfo.level, Validators.compose([])],
      'priority': [this.testResultInfo.priority, Validators.compose([])]
    });

    this.name = this.testResultForm.controls['name'];
    this.detail = this.testResultForm.controls['detail'];
    this.caseId = this.testResultForm.controls['caseId'];
    this.testSetId = this.testResultForm.controls['testSetId'];
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

  onSubmit() {
    let testResultInfo = Object.assign(this.testResultForm.value, {releaseId:this.releaseId, projectId:this.projectId});
    testResultInfo.level = testResultInfo.level || 'normal';
    testResultInfo.priority = testResultInfo.priority || 'normal';
    if (this.mode === 'new') {
      this._service.newTestResult(testResultInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({name: 'TestResultModification', content: 'OK'});
            this.toasterService.pop('ok', '新建测试结果成功');
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    } else {
      testResultInfo = Object.assign(testResultInfo, {id: this.testResultInfo.id});
      this._service.updateTestResult(testResultInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({name: 'TestResultModification', content: 'OK'});
            this.toasterService.pop('ok', '测试结果修改成功');
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}

