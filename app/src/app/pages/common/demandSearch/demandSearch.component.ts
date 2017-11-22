import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'demand-search',
  templateUrl: './demandSearch.html',
  styleUrls: ['./demandSearch.scss']
})
export class DemandSearchComponent {

  form: FormGroup;
  demand: AbstractControl;
  @Input() name: string = '';
  @Input() showField: string = 'title';
  @Input() placeholder: string = '';
  @Input() showDemandList: boolean = false;
  @Input() demand_showNoItem: boolean = false;
  @Input() demandList: any[] = [];
  @Output() searchDemand: EventEmitter<any> = new EventEmitter<any>();
  @Output() chooseData: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private ref: ElementRef){

    // this.form = this.fb.group({
    //   "demand": ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    // });
    // this.demand = this.form.controls['demand'];
  }

  ngOnInit(){
    Observable.fromEvent(this.ref.nativeElement, 'keyup')
      .map( (e: any) => e.target.value )
      .debounceTime(700)
      .subscribe( (text: any) => {this.searchDemand.next(text)},(err: any) => {console.log(err)},() => console.log('complete'));
  }

  choose(item: any){
    this.name = item.title;
    this.demandList = [];
    this.chooseData.emit(item);
  }
}
