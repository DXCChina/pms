import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {AbstractControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {TestCase} from "./test-case.model";
import {CaseDetailModalService} from "./case-detail-modal.service";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'app-case-detail-modal',
  templateUrl: './case-detail-modal.component.html',
  styleUrls: ['./case-detail-modal.component.css'],
  providers:[CaseDetailModalService]
})
export class CaseDetailModalComponent implements OnInit {

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
    'dependentDemand':'',
    'input': '',
    'expect': ''
  };
  validationMessages = {
    'name': {
      'required': '请输入用例名称',
      'minlength': '用例名称最少4个字符长'
    },
    'dependentDemand':{
      'required': '请输入用例类型'
    },
    'type': {
      'required': '请输入用例类型'
    }
  };

  mode: string = "";
  projectId: string = "";

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  searchDemandList: any[] = [];
  demandTittle: string = '';
  caseId: string = '';

  constructor(public dialogRef: MatDialogRef<CaseDetailModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, private toasterService: ToasterService, private _service:CaseDetailModalService,
              private eventManager: JhiEventManager) {
    this.mode = this.data.mode;
    if(this.mode === 'update'){
      this.testCaseInfo = this.data.caseInfo;
      this.caseId = this.data.caseInfo.id;
    }
    this.projectId = sessionStorage.getItem('projectId');
  }

  ngOnInit() {
    this.buildForm();
    if(this.mode === 'update'){
      this.reviewDetail();
    }
  }

  reviewDetail(){
    this._service.reviewDetail(this.data.caseInfo.demandId)
      .then(res=>{
        this.demandTittle = res.data&&res.data.demandTittle;
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

  onSubmit(data) {
    this.testCaseParams = Object.assign({projectId:this.projectId},this.testCaseParams);
    this.testCaseParams = Object.assign(this.testCaseParams, this.testCaseForm.value);
    if(this.mode === 'create'){
      this._service.newCase(this.testCaseParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '新建测试用例成功');
            this.eventManager.broadcast({name: 'TestCaseListModification', content: 'OK'});
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }else if(this.mode === 'update'){
      this.testCaseParams = Object.assign({id: this.caseId}, this.testCaseParams);
      this._service.updateCase(this.testCaseParams)
        .then(res => {
          if (res.msg === 'ok') {
            this.toasterService.pop('ok', '测试用例修改成功');
            this.eventManager.broadcast({name: 'TestCaseListModification', content: 'OK'});
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }
  }

  emitSearch(str){
    this._service.searchDemandList(str)
      .then(res => {
        if (res.msg === 'ok') {
          this.searchDemandList = res.data;
        }
      });
  }

  select(demand){
    this.testCaseParams['demandId'] = demand.id;
  }
}
