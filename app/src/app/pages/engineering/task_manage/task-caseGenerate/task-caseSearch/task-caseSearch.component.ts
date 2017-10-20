import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEvent"
import 'rxjs/Rx'
import {CasePages} from "../../../case_manage/caseList.model";

@Component({
  selector: 'task-caseSearch',
  templateUrl: './task-caseSearch.html',
  styleUrls: ['./task-caseSearch.scss']
})
export class TaskCaseSearchComponent implements OnInit{

  @Input('selectedCase') selectedCase: CasePages[] = [];
  @Output() selectedCaseChange = new EventEmitter();
  @Input() showCaseList: boolean = false;
  @Input() case_showNoItem: boolean = false;
  @Input() case_searchDataes: CasePages[];
  @Output() searchCase: EventEmitter<string> = new EventEmitter<string>();
  @Output() chooseData: EventEmitter<CasePages> = new EventEmitter<CasePages>();

  constructor(private ref: ElementRef){

  }

  ngOnInit(){
    Observable.fromEvent(this.ref.nativeElement, 'keyup')
      .map( (e: any) => e.target.value)
      .debounceTime(700)
      .subscribe( (search: any) => this.searchCase.next(search), (err: any) => console.log(err), () => console.log('complete'))
  }

  add(cases: CasePages){
    this.selectedCase.push(cases);
    this.selectedCase = this.selectedCase.concat();
    this.selectedCaseChange.emit(this.selectedCase);
    return false;
  }

}
