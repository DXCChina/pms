import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, AbstractControl, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatChipInputEvent } from '@angular/material';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { JhiEventManager } from 'ng-jhipster';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

import { TestSetService } from './test-set-detail.service';
import { TestSet } from './test-set-detail.model';

@Component({
  selector: 'app-test-set-detail',
  templateUrl: './test-set-detail.component.html',
  styleUrls: ['test-set-detail.component.scss'],
  providers: [TestSetService]
})

export class TestSetDetailComponent implements OnInit {
  name: AbstractControl;
  detail: AbstractControl;
  // case: AbstractControl;
  memberId: AbstractControl;

  testSetForm: FormGroup;

  formErrors = {
    'name': '',
    'detail': '',
    // 'case': '',
    'memberId': ''
  };

  validationMessages = {
    'name': {
      'required': '请输入测试集名称'
    },
    'detail': {},
    // 'case': {
    //   'required': '请选择测试集相关案例'
    // },
    'memberId': {
      'required': '请选择测试集相关人员'
    }
  };

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  mode: string;
  projectId: number;
  releaseId: number;

  testSetInfo: TestSet = new TestSet();

  testMemberList: any[] = [];

  testCaseList: any[] = [];
  searchCaseList: any[] = [];
  queryOfCase = '';

  searchControl: FormControl;
  filteredCases: Observable<any[]>;

  options: any = {
    imageUploadURL: '/api/upload'
  };

  constructor(
    private _service: TestSetService,
    public fb: FormBuilder,
    private toasterService: ToasterService,
    private eventManager: JhiEventManager,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.projectId = parseInt(sessionStorage.getItem('projectId'), 10);
    this.releaseId = parseInt(sessionStorage.getItem('releaseId'), 10);

    this.route.url.subscribe(url => {
      this.mode = url[0].path
    });

    this.searchControl = new FormControl();
    this.filteredCases = this.searchControl.valueChanges
      .pipe(
        startWith(this.queryOfCase),
        map(Case => Case ? this.filterCases(Case) : this.searchCaseList.slice())
      );
  }

  filterCases(name: string) {
    return this.searchCaseList.filter(Case =>
      Case.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  ngOnInit() {
    if (this.mode !== 'new') {
      this.route.params.subscribe(param => {
        if (param['id']) {
          this.reviewDetail(param['id']);
        }
      });
    }
    this.findTestMember();
    this.findTestCase();
    this.buildForm();
  }

  reviewDetail(testSetId) {
    this._service.reviewTestSet(testSetId)
      .then(res => {
        if (res.msg === 'ok') {
          this.testSetInfo = res.data;
          this.testCaseList = this.testSetInfo.case;
        } else {
          this.router.navigate(['../'], { relativeTo: this.route });
        }
      });
  }

  findTestCase() {
    this._service.searchTestCase('', this.releaseId)
        .then(res => {
          if (res.msg === 'ok') {
            this.searchCaseList = res.data;
          }
        });
  }

  findTestMember() {
    this._service.searchTestMember(this.projectId)
      .then(res => {
        this.testMemberList = res.data;
      });
  }

  buildForm() {
    this.testSetForm = this.fb.group({
      'name': [this.testSetInfo.name, Validators.compose([Validators.required])],
      'detail': [this.testSetInfo.detail, Validators.compose([])],
      // 'case': [this.testSetInfo.case, Validators.compose([Validators.required])],
      'memberId': [this.testSetInfo.memberId, Validators.compose([Validators.required])]
    });

    this.name = this.testSetForm.controls['name'];
    this.detail = this.testSetForm.controls['detail'];
    // this.case = this.testSetForm.controls['case'];
    this.memberId = this.testSetForm.controls['memberId'];

    this.testSetForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if (!this.testSetForm) {
      return;
    }
    const form = this.testSetForm;
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

  viewCaseDetail(id) {
    this.router.navigate([`../../testCase/${id}`], { relativeTo: this.route });
  }

  addCase(caseObj) {
    let HAVE_ID = false;
    this.testCaseList.forEach(el => {
      if (el.id === caseObj.id) {
        HAVE_ID = true;
        return;
      }
    });
    if (!HAVE_ID) { this.testCaseList.push(caseObj); }
    this.queryOfCase = '';
  }

  deleteCase(id) {
    this.testCaseList = this.testCaseList.filter(el => {
      return el.id !== id;
    });
  }

  cancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit() {
    let testSetInfo = Object.assign(
      this.testSetForm.value,
      {
        releaseId: this.releaseId,
        testCase: this.testCaseList.map(i => i.id)
      }
    );
    if (this.mode === 'new') {
      this._service.newTestSet(testSetInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({ name: 'TestSetModification', content: 'OK' });
            this.toasterService.pop('ok', '新建测试集成功');
            this.router.navigate(['../'], { relativeTo: this.route });
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    } else {
      testSetInfo = Object.assign(testSetInfo, { id: this.testSetInfo.id });
      this._service.updateTestSet(testSetInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({ name: 'TestSetModification', content: 'OK' });
            this.toasterService.pop('ok', '测试集修改成功');
            this.router.navigate(['../'], { relativeTo: this.route });
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }
  }

}
