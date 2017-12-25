import {Component, OnInit} from '@angular/core';
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {PmDemandDetailService} from "./demand-detail-dialog.service";
import {FormBuilder, Validators, AbstractControl, FormGroup} from "@angular/forms";
import {Demand} from "./demand.model";
import {JhiEventManager} from "ng-jhipster";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(public fb: FormBuilder, private _service: PmDemandDetailService, private toasterService: ToasterService,
              private eventManager: JhiEventManager, private route: ActivatedRoute, private router:Router) {
    this.projectId = sessionStorage.getItem('projectId');
    this.releaseId = sessionStorage.getItem('releaseId');

    this.route.queryParams.filter(params => params.type)
      .subscribe(params => {
        this.mode = params.type;
      })
  }

  ngOnInit() {
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

  onSubmit() {
    let demandInfo = Object.assign(this.demandForm.value, {projectId: this.projectId, releaseId:this.releaseId});
    if (this.mode === 'new') {
      this._service.newDemand(demandInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({name: 'DemandListModification', content: 'OK'});
            this.toasterService.pop('ok', '新建需求成功');
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    } else {
      demandInfo = Object.assign(demandInfo, {id: this.demandInfo.id});
      this._service.updateDemand(demandInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({name: 'DemandListModification', content: 'OK'});
            this.toasterService.pop('ok', '需求修改成功');
            this.router.navigate(['../'], {relativeTo: this.route});
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }
  }

  cancel(){
    this.router.navigate(['../'], {relativeTo:this.route});
  }
}
