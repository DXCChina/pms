import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent"
import 'rxjs/Rx'
import {Animation} from "./animation";
import {ConfigEntity} from "../../../../theme/components/w-dataList/config.Entity";
import {memberData, searchResult} from "../project.Entity";
import {ProjectManageService} from "../projecgt-management.service";
import {GlobalState} from "../../../../global.state";
import {ToasterService} from "angular2-toaster";

@Component({
  selector: 'people-management',
  templateUrl: './people-management.component.html',
  styleUrls: ['./people-management.component.scss'],
  inputs:['showList','dataes','searchDataes','projectId'],
  providers:[ProjectManageService],
  outputs:['search'],
  animations:[
    Animation
  ]
})
export class PeopleManagementComponent implements OnInit {

  showList: boolean;
  controlBtn: boolean = true;
  dataes: any[];
  isDelete: memberData[] = [];
  isAdd: memberData[] = [];
  projectId: string;
  searchDataes: searchResult;
  configList: ConfigEntity;
  configSearch: ConfigEntity;
  search : EventEmitter<string> = new EventEmitter<string>();
  private getMembersUrl = this.Global.baseURL + '/api/project/members';
  private addMemberUrl = this.Global.baseURL + '/api/project/member/add';
  private deleteMemberUrl = this.Global.baseURL + '/api/project/member/remove';

  constructor(private ref: ElementRef, public _service: ProjectManageService, public Global: GlobalState ,private toasterService: ToasterService) {

    this.configSearch = this.configList = {
      "name":"username",
      "description":"",
      "id":"userId"
    };

  }

  ngOnInit() {

    Observable.fromEvent(this.ref.nativeElement,'keyup')
      .map((e:any) => e.target.value)
      // .filter((text:any) => text.length>1)
      .debounceTime(700)
      .subscribe((text:string)=>{this.search.next(text)},(err:any)=>{console.log(err)},()=>{console.log('complete')})
  }

  clearValue(input: HTMLInputElement){

    input.value = '';
    this.search.next('')
  }

  deleteMembers(data: memberData){
    this.controlBtn = false;
    this.isDelete.push(data);
    this.dataes = this.dataes.filter(value => value !== data)
  }

  addMembers(data: memberData){
    this.controlBtn = false;
    let judge: boolean = false;
    this.dataes.forEach(value => judge = judge || (value.username == data.username));
    // this.searchDataes.unproject = this.searchDataes.unproject.filter(value => value !== data);
    if(!judge){
      this.isAdd.push(data);
      this.dataes.push(data);
      this.searchDataes.out = this.searchDataes.out.filter(value => value !== data);
      this.searchDataes.inPro.push(data)
    }else{
      this.toasterService.pop('error','添加失败','请勿重复添加！')
    }
  }

  savePeople(){
    this.search.next('');
    let addNames: string[] = [];
    let deleteNames: string[] = [];
    this.isAdd.map(value => addNames.push(value.username));
    this.isDelete.map(value => deleteNames.push(value.username));

    if(addNames.length > 0){
      this._service.memberControl(this.addMemberUrl, this.projectId, addNames)
        .then(res => {
          if(res.message === 'ok'){
            this.toasterService.pop('success','保存成功','save success!');
            this.controlBtn = true;
          }else{
            this.toasterService.pop('error','保存失败',res.message)
          }
        },error =>
          console.log(error));
    }
    if(deleteNames.length > 0){
      this._service.memberControl(this.deleteMemberUrl, this.projectId, deleteNames)
        .then(res =>{
          if(res.message === 'ok'){
            this.toasterService.pop('success','保存成功','save success!')
            this.controlBtn = true;
          }else{
            this.toasterService.pop('error','保存失败',res.message)
          }
        }, error => console.log(error));
    }
    this.isAdd = [];
    this.isDelete = [];
  }

  cancelPeople(){
    this.showList = false;
    this.controlBtn = true;
    let url = `${this.getMembersUrl}/${this.projectId}`;
    this._service.getMembers(url)
      .then(res => {
          this.dataes = res.data
        },
        error => {
          console.log(error)
        })
  }
}
