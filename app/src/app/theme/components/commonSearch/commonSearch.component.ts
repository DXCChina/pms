import {Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable, Subscribable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'common-search',
  templateUrl: './commonSearch.component.html',
  styleUrls: ['./commonSearch.component.scss']
})
export class CommonSearchComponent implements OnInit, OnChanges, OnDestroy {
  @Input() placeHolder: string;
  @Input() field: string;
  @Input() searchList: any[];
  @Input() value: string;
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  searchObservable: Subscription;
  form: FormGroup;
  // value: string;
  display: string = '';
  searchStr: string = '';
  constructor(private ref: ElementRef) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      search: new FormControl('')
    });

    this.searchObservable = Observable.fromEvent(this.ref.nativeElement, 'keyup')
      .map( (e: any) =>  e.target.value )
      .debounceTime(500)
      .subscribe((search: any) => {
      this.search.next(search.trim());
      this.searchStr = search.trim();
    });
  };

  ngOnChanges() {
    if (this.searchList.length === 0 && this.searchStr !== '') {
      console.log('none');
      this.display = 'none';
    } else if (this.searchStr === '') {
      this.display = '';
    } else {
      console.log('show');
      this.display = 'show';
    }
  }

  ngOnDestroy() {
    this.searchObservable.unsubscribe();
  }

  choose(data: any) {
    this.value = data[this.field];
    this.display = '';
    this.select.emit(data);
  }

  clear() {
    this.value = '';
    this.display = '';
  }
}
