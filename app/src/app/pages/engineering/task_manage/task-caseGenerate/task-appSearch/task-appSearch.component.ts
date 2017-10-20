import {Component, ElementRef, EventEmitter, Input, OnInit,
  Output
} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent"
import 'rxjs/Rx'
import {AppPages} from "../../../app_manage/app.pagination.Entity";

@Component({
  selector: 'task-appSearch',
  templateUrl: './task-appSearch.html',
  styleUrls: ['./task-appSearch.scss']
})
export class TaskAppSearchComponent implements OnInit {

  form: FormGroup;
  appName: AbstractControl;
  @Input() name: string = '';
  @Input() showAppList: boolean = false;
  @Input() app_showNoItem: boolean = false;
  @Input() app_searchDataes: AppPages[] = [];
  @Output() searchApp: EventEmitter<string> = new EventEmitter<string>();
  @Output() chooseData: EventEmitter<AppPages> = new EventEmitter<AppPages>();

  constructor(private fb: FormBuilder, private ref: ElementRef){

    this.form = this.fb.group({
      "appName": ['', Validators.compose([Validators.required, this.customValidator])]
    });
    this.appName = this.form.controls['appName'];
  }

  ngOnInit(){
    Observable.fromEvent(this.ref.nativeElement, 'keyup')
      .map( (e: any) => e.target.value )
      .debounceTime(700)
      .subscribe( (text: any) => {this.searchApp.next(text)},(err: any) => {console.log(err)},() => console.log('complete'));
  }

  choose(item: AppPages){
    this.name = item.name;
    this.app_searchDataes = [];
    this.chooseData.emit(item);
  }

  customValidator(control: FormControl){
    if(!control.value.match(/.apk$/)){
      return {invalidCustom: true}
    }
  }
}
