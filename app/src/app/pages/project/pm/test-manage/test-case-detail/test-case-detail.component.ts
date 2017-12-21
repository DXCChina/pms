import {Component, OnInit, Inject} from '@angular/core';
import {AbstractControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {TestCase} from "./test-case.model";
import {CaseDetailModalService} from "./case-detail-modal.service";
import {JhiEventManager} from "ng-jhipster";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss'],
  providers: [CaseDetailModalService]
})
export class TestCaseDetailComponent implements OnInit {

  name: AbstractControl;
  detail: AbstractControl;
  type: AbstractControl;
  input: AbstractControl;
  expect: AbstractControl;
  testCaseForm: FormGroup;
  testCaseInfo: TestCase = new TestCase();
  testCaseParams: any = {};

  formErrors = {
    'name': '',
    'detail': '',
    'type': '',
    'dependentDemand': '',
    'input': '',
    'expect': ''
  };
  validationMessages = {
    'name': {
      'required': '请输入用例名称',
      'minlength': '用例名称最少4个字符长'
    },
    'dependentDemand': {
      'required': '请输入用例类型'
    },
    'type': {
      'required': '请输入用例类型'
    }
  };

  mode: string = "";
  projectId: string = "";
  releaseId: string = "";

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  searchDemandList: any[] = [];
  caseId: string = '';

  constructor(public fb: FormBuilder, private toasterService: ToasterService, private _service: CaseDetailModalService,
              private eventManager: JhiEventManager, private router:Router, private route:ActivatedRoute) {
    this.projectId = sessionStorage.getItem('projectId');
    this.releaseId = sessionStorage.getItem('releaseId');

    this.route.queryParams.filter(params => params.type)
      .subscribe(params => {
        this.mode = params.type;
      })
  }

  ngOnInit() {
    this.buildForm();
    if (this.mode != 'new') {
      this.route.params.subscribe(param => {
        if (param['id']) {
          this.caseId = param['id'];
          this.reviewDetail(param['id']);
        }
      });
    }
  }

  reviewDetail(id) {
    this._service.reviewDetail(id)
      .then(res => {
        console.log("case:", res);
        this.testCaseInfo = res.data;
        this.testCaseParams['demandId'] = res.data.demandId;
      })
  }

  buildForm() {
    this.testCaseForm = this.fb.group({
      'name': [this.testCaseInfo.name, Validators.compose([Validators.required, Validators.minLength(4)])],
      'detail': [this.testCaseInfo.detail, Validators.compose([])],
      'type': [this.testCaseInfo.type, Validators.compose([])],
      'input': [this.testCaseInfo.input, Validators.compose([])],
      'expect': [this.testCaseInfo.expect, Validators.compose([])]
    });

    this.name = this.testCaseForm.controls['name'];
    this.detail = this.testCaseForm.controls['detail'];
    this.type = this.testCaseForm.controls['type'];
    this.input = this.testCaseForm.controls['input'];
    this.expect = this.testCaseForm.controls['expect'];

    this.testCaseForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data ?: any) {
    if (!this.testCaseForm) {
      return;
    }
    const form = this.testCaseForm;
    for (const field in this.formErrors) {

      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.testCaseParams = Object.assign({projectId:this.projectId, releaseId:this.releaseId},this.testCaseParams);
    this.testCaseParams = Object.assign(this.testCaseParams, this.testCaseForm.value);
    if (this.mode === 'new') {
      this._service.newCase(this.testCaseParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '新建测试用例成功');
            this.eventManager.broadcast({name: 'TestCaseListModification', content: 'OK'});
            this.router.navigate(['../'], {relativeTo:this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    } else {
      this.testCaseParams = Object.assign({id: this.caseId}, this.testCaseParams);
      this._service.updateCase(this.testCaseParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '测试用例修改成功');
            this.eventManager.broadcast({name: 'TestCaseListModification', content: 'OK'});
            this.router.navigate(['../'], {relativeTo:this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }
  }

  emitSearch(str) {
    this.searchDemandList = [];
    this._service.searchDemandList(str, this.projectId)
      .then(res => {
        this.searchDemandList = res.data;
      });
  }

  select(demand) {
    this.testCaseParams['demandId'] = demand.id;
  }

  cancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }

}

