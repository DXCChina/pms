import {Component, OnInit, ElementRef, AfterViewInit, ViewChild} from '@angular/core';
import {AbstractControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {TestCase} from "./test-case.model";
import {CaseDetailModalService} from "./case-detail-modal.service";
import {JhiEventManager} from "ng-jhipster";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-test-case-detail',
  templateUrl: './test-case-detail.component.html',
  styleUrls: ['./test-case-detail.component.scss'],
  providers: [CaseDetailModalService]
})
export class TestCaseDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('search') searchInput: ElementRef;

  name: AbstractControl;
  detail: AbstractControl;
  type: AbstractControl;
  status: AbstractControl;
  input: AbstractControl;
  expect: AbstractControl;
  ownername: AbstractControl;
  search: AbstractControl;
  testCaseForm: FormGroup;
  testCaseInfo: TestCase = new TestCase();
  testCaseParams: any = {};

  formErrors = {
    'name': '',
    'detail': '',
    'type': '',
    'status': '',
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
    },
    'status': {
      'required': '请输入用例状态'
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
  value: string = '';
  searchObservable: Subscription;
  display: boolean = false;

  options: any = {
    imageUploadURL: '/api/upload'
  };

  constructor(public fb: FormBuilder, private toasterService: ToasterService, private _service: CaseDetailModalService,
              private eventManager: JhiEventManager, private router: Router, private route: ActivatedRoute) {
    this.projectId = sessionStorage.getItem('projectId');
    this.releaseId = sessionStorage.getItem('releaseId');

    this.route.url.subscribe(url => {
      this.mode = url[0].path
    });

    // Determines if a route should be reused
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        this.buildForm();
        if (this.mode != 'new') {
          this.route.params.subscribe(param => {
            if (param['id']) {
              this.caseId = param['id'];
              this.reviewDetail(param['id']);
            }
          });
        }
        this.findDemand(this.value);
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchObservable = Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .map((e: any) => e.target.value)
      .debounceTime(100)
      .subscribe((search: any) => {
        this.findDemand(search);
      });
  }

  reviewDetail(id) {
    this._service.reviewDetail(id)
      .then(res => {
        this.testCaseInfo = res.data;
        this.testCaseParams['demandId'] = res.data.demandId;
      })
  }

  buildForm() {
    this.testCaseForm = this.fb.group({
      'name': [this.testCaseInfo.name, Validators.compose([Validators.required, Validators.minLength(4)])],
      'detail': [this.testCaseInfo.detail, Validators.compose([])],
      'type': [this.testCaseInfo.type, Validators.compose([])],
      'status': [this.testCaseInfo.status, Validators.compose([])],
      'input': [this.testCaseInfo.input, Validators.compose([])],
      'expect': [this.testCaseInfo.expect, Validators.compose([])],
      'ownername': [this.testCaseInfo.ownername, Validators.compose([])],
      'search': ['', Validators.compose([])]
    });

    this.name = this.testCaseForm.controls['name'];
    this.detail = this.testCaseForm.controls['detail'];
    this.type = this.testCaseForm.controls['type'];
    this.status = this.testCaseForm.controls['status'];
    this.input = this.testCaseForm.controls['input'];
    this.expect = this.testCaseForm.controls['expect'];
    this.ownername = this.testCaseForm.controls['ownername'];
    this.search = this.testCaseForm.controls['search'];

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

  onSubmit(type) {
    this.testCaseParams = Object.assign({projectId: this.projectId, releaseId: this.releaseId}, this.testCaseParams);
    this.testCaseParams = Object.assign(this.testCaseParams, this.testCaseForm.value);
    if (this.mode === 'new') {
      this.newCase(this.testCaseParams, type);
    } else {
      this.testCaseParams = Object.assign({id: this.caseId}, this.testCaseParams);
      this.updateCase(this.testCaseParams);
    }
  }

  newCase(testCaseParams, type){
    this._service.newCase(testCaseParams)
      .then(res => {
        if (res.msg === 'ok') {
          this.toasterService.pop('ok', '新建测试用例成功');
          this.eventManager.broadcast({name: 'TestCaseListModification', content: 'OK'});
          if (type === 'one') {
            this.router.navigate(['../'], {relativeTo: this.route});
          } else if(type === 'again'){
            this.router.navigate(['../new'], {relativeTo: this.route});
          }
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }

  updateCase(testCaseParams){
    this._service.updateCase(testCaseParams)
      .then(res => {
        if (res.msg === 'ok') {
          this.toasterService.pop('ok', '测试用例修改成功');
          this.eventManager.broadcast({name: 'TestCaseListModification', content: 'OK'});
          this.router.navigate(['../'], {relativeTo: this.route});
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }

  findDemand(value) {
    this.display = true;
    this._service.searchDemandList(value, this.projectId)
      .then(res => {
        this.searchDemandList = res.data;
      });
  }

  select(demand) {
    this.testCaseParams['demandId'] = demand.id;
  }

  cancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

