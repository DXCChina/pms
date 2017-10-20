import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ScriptPages} from "../../engineering/script_manage/script.Entity";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'script-search',
  templateUrl: './scriptSearch.html',
  styleUrls: ['./scriptSearch.scss']
})
export class ScriptSearchComponent {

  form: FormGroup;
  scriptName: AbstractControl;
  @Input() name: string = '';
  @Input() showScriptList: boolean = false;
  @Input() script_showNoItem: boolean = false;
  @Input() script_searchDataes: ScriptPages[] = [];
  @Output() searchScript: EventEmitter<string> = new EventEmitter<string>();
  @Output() chooseData: EventEmitter<ScriptPages> = new EventEmitter<ScriptPages>();

  constructor(private fb: FormBuilder, private ref: ElementRef){

    this.form = this.fb.group({
      "scriptName": ['', Validators.compose([Validators.required, this.customValidator])]
    });
    this.scriptName = this.form.controls['scriptName'];
  }

  ngOnInit(){
    Observable.fromEvent(this.ref.nativeElement, 'keyup')
      .map( (e: any) => e.target.value )
      .debounceTime(700)
      .subscribe( (text: any) => {this.searchScript.next(text)},(err: any) => {console.log(err)},() => console.log('complete'));
  }

  choose(item: ScriptPages){
    this.name = item.name;
    this.script_searchDataes = [];
    this.chooseData.emit(item);
  }

  customValidator(control: FormControl){
    if(!control.value.match(/.py$/)){
      return {invalidCustom: true}
    }
  }

}
