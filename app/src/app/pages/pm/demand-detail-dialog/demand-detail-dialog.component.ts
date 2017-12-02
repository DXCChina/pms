import {Component, Inject} from "@angular/core";
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";
import {Validators, AbstractControl, FormGroup, FormBuilder} from "@angular/forms";
import {PmDemandDetailService} from "./demand-detail-dialog.service";
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {Demand} from "./demand.model";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'demand-detail-dialog',
  templateUrl: 'demand-detail-dialog.component.html',
  styleUrls: ['demand-detail-dialog.component.scss'],
  providers: [PmDemandDetailService]
})
export class DemandDetailDialogComponent {
  title: AbstractControl;
  detail: AbstractControl;
  assignTask: AbstractControl;
  level: AbstractControl;
  createAt: AbstractControl;
  demandForm: FormGroup;

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

  toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: false,
    showCloseButton: true
  });

  demandInfo: Demand = new Demand();

  constructor(public dialogRef: MatDialogRef<DemandDetailDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder, private _service: PmDemandDetailService, private toasterService: ToasterService,
              private eventManager: JhiEventManager) {
    this.mode = this.data.mode;
    this.projectId = sessionStorage.getItem('projectId');
  }

  ngOnInit() {
    if (this.mode == 'update') {
      this.demandInfo = this.data.info;
      // this.reviewDetail(this.demandId);
    }
    this.buildForm();
  }

  // reviewDetail(demandId) {
  //   this._service.reviewDemandDetail(demandId)
  //     .then(res => {
  //       this.demandInfo = res.data;
  //     })
  // }

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


  onSubmit(data) {
    let demandInfo = Object.assign(this.demandForm.value, {projectId: this.projectId});
    if(this.mode === 'create'){
      this._service.newDemand(demandInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({name: 'DemandListModification', content: 'OK'});
            this.toasterService.pop('ok', '新建需求成功');
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });
    }else if(this.mode === 'update'){
      demandInfo = Object.assign(demandInfo, {id: this.demandInfo.id});
      this._service.updateDemand(demandInfo)
        .then(res => {
          if (res.msg === 'ok') {
            this.eventManager.broadcast({name: 'DemandListModification', content: 'OK'});
            this.toasterService.pop('ok', '需求修改成功');
            this.dialogRef.close();
          } else {
            this.toasterService.pop('error', res.msg);
          }
        });

    }
  }
}
