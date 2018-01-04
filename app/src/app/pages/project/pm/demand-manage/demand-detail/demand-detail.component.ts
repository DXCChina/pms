import {Component, OnInit} from '@angular/core';
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {PmDemandDetailService} from "./demand-detail-dialog.service";
import {FormBuilder, Validators, AbstractControl, FormGroup} from "@angular/forms";
import {Demand} from "./demand.model";
import {ActivatedRoute, Router, NavigationEnd} from "@angular/router";

@Component({
  selector: 'app-demand-detail',
  templateUrl: './demand-detail.component.html',
  styleUrls: ['demand-detail.component.scss'],
  providers: [PmDemandDetailService]
})
export class DemandDetailComponent implements OnInit {

  title: AbstractControl;
  detail: AbstractControl;
  assignTask: AbstractControl;
  level: AbstractControl;
  createAt: AbstractControl;
  demandForm: FormGroup;
  isOperate:boolean = false;

  formErrors = {
    'title': '',
    'detail': '',
    'assignTask': '',
    'level': ''
  };
  validationMessages = {
    'title': {
      'required': '请输入需求名称',
      'minlength': '需求名称最少4个字符长'
    },
    'assignTask': {},
    'level': {
      'required': '请输入需求优先级'
    }
  };

  mode: string = "";
  projectId: string = "";
  releaseId: string = "";

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  demandInfo: Demand = new Demand();

  options: any = {
    imageUploadURL: '/api/upload'
  };

  constructor(public fb: FormBuilder, private _service: PmDemandDetailService, private toasterService: ToasterService,
              private route: ActivatedRoute, private router:Router) {
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

        this.isOperate = sessionStorage.getItem('userRoleInProject') == 'pm';

        if (this.mode != 'new') {
          this.route.params.subscribe(param => {
            if (param['id']) {
              this.reviewDetail(param['id']);
            }
          });
        }
        this.buildForm();
      }
    });
  }

  ngOnInit() {
  }

  reviewDetail(demandId) {
    this._service.reviewDemandDetail(demandId)
      .then(res => {
        this.demandInfo = res.data;
        if (!this.demandInfo.activityId) {
          this.demandInfo.activityTittle = '没有绑定任务'
        }
      })
  }

  buildForm() {
    this.demandForm = this.fb.group({
      'title': [this.demandInfo.title, Validators.compose([Validators.required, Validators.minLength(4)])],
      'detail': [this.demandInfo.detail, Validators.compose([])],
      'assignTask': [this.demandInfo.activityId, Validators.compose([])],
      'level': [this.demandInfo.level, Validators.compose([Validators.required])],
      'createAt': [this.demandInfo.createAt, Validators.compose([])]
    });

    this.title = this.demandForm.controls['title'];
    this.detail = this.demandForm.controls['detail'];
    this.assignTask = this.demandForm.controls['assignTask'];
    this.level = this.demandForm.controls['level'];
    this.createAt = this.demandForm.controls['createAt'];

    this.demandForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data ?: any) {
    if (!this.demandForm) {
      return;
    }
    const form = this.demandForm;
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
    let demandInfo = Object.assign(this.demandForm.value, {projectId: this.projectId, releaseId:this.releaseId});
    if (this.mode === 'new') {
      this.newDemand(demandInfo, type);
    } else {
      demandInfo = Object.assign(demandInfo, {id: this.demandInfo.id});
      this.updateDemand(demandInfo);
    }
  }

  newDemand(demandInfo,type){
    this._service.newDemand(demandInfo)
      .then(res => {
        if (res.msg === 'ok') {
          this.toasterService.pop('ok', '新建需求成功');
          if(type == 'one'){
            this.router.navigate(['../'], {relativeTo: this.route});
          }else if(type == 'again'){
            this.router.navigate(['../new'], {relativeTo: this.route});
          }
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }

  updateDemand(demandInfo){
    this._service.updateDemand(demandInfo)
      .then(res => {
        if (res.msg === 'ok') {
          this.toasterService.pop('ok', '需求修改成功');
          this.router.navigate(['../'], {relativeTo: this.route});
        } else {
          this.toasterService.pop('error', res.msg);
        }
      });
  }

  cancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
