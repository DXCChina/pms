import {Component, ElementRef, Input, Renderer2} from "@angular/core";
import './ckeditor.load'
import 'ckeditor'
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DemandService} from "../demand.service";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'create-demand',
  templateUrl: './create_demand.html',
  styleUrls: ['./create_demand.scss']
})
export class CreateDemandComponent {

  form: FormGroup;

  title: AbstractControl;
  detail: AbstractControl;
  cost: AbstractControl;
  progress: AbstractControl;

  targets: any[] = [
    {value: 'demand', name: '需求'},
    {value: 'task', name: '任务'}
  ];
  target: string = 'demand';
  status: string = 'active';
  level: string = 'normal';
  assign: number;
  assignCustom = [
    {username: '--我自己--', memberId: localStorage.getItem('memberId')}
  ];

  demandSearchList: any[];
  showDemandList: boolean = false;
  demandId: number;

  //some judge
  constructor(private fb: FormBuilder, private ref: ElementRef, private Renderer: Renderer2, private service: DemandService,
              public dialogRef: MatDialogRef<CreateDemandComponent>) {

    this.form = this.fb.group({
      "title": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      "detail": ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      "cost": ['', Validators.compose([Validators.required, this.numberValidator])],
      "progress": ['', Validators.compose([Validators.required, this.numberValidator])]
    });

    this.title = this.form.controls["title"];
    this.detail = this.form.controls["detail"];
    this.cost = this.form.controls["cost"];
    this.progress = this.form.controls["progress"];
  }

  numberValidator(control: FormControl){
    if(!control.value.match(/^[1-9]\d*$/)){
      return {invalidCustom: true}
    }
  }

  onSubmit(pickerstart: any, pickerend: any) {

    if(this.target === 'demand') {

      this.service.createDemand(this.title.value, this.detail.value, this.level,
                                this.status, pickerstart.startAt, pickerend.startAt, Number(this.progress.value), Number(this.cost.value))
        .then(res => {
          if(res.message === 'ok') {
            this.dialogRef.close(true)
          }
        }).catch(err => { console.log('err:', err) })

    } else if (this.target === 'task') {

      console.log(this.assign, this.level)
      this.service.createTask(this.assign, this.demandId, this.title.value, this.detail.value, this.level,
                                this.status, pickerstart.startAt, pickerend.startAt, Number(this.progress.value), Number(this.cost.value))
        .then(res => {
          if(res.message === 'ok') {
            this.dialogRef.close(true)
          } else {
            alert('任务名重复！')
          }
        }).catch(err => { console.log('err:', err) })
    }
  }

  //target value changed method
  targetChanged(target: any) {
    this.target = target.value;
    let des = this.ref.nativeElement.querySelector('#Des');
    let asc = this.ref.nativeElement.querySelector('#Asc');

    if(target.value === 'task') {
      this.getMember();
      this.Renderer.addClass(des, 'isDes');
      this.Renderer.removeClass(asc, 'asc');
      this.Renderer.addClass(asc, 'isAsc');
    } else {
      this.assignCustom = [
        {username: '--我自己--', memberId: localStorage.getItem('memberId')}
      ];
      this.Renderer.removeClass(des, 'isDes');
      this.Renderer.addClass(asc, 'asc');
      this.Renderer.removeClass(asc, 'isAsc');
    }
  }

  getMember() {
    this.service.getMember()
      .then(res => {
        if (res.message === 'ok') {
          console.log(res.data)
          this.assignCustom = res.data;
        }
      }).catch(err => console.log(err))
  }

  searchDemand(query: any){
    if (query !== '') {
      this.service.demandFuzzySearch(query)
      .then(res => {
        this.demandSearchList = res.data;
        res.data.length > 0 ? this.showDemandList = true : this.showDemandList = false;
      }).catch(err => { console.log(err)} )
    } else {
      this.showDemandList = false;
    }
  }

  chooseData(demand: any) {
    console.log(demand.id);
    this.demandId = demand.id
  }

}
