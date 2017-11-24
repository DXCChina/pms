import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, Renderer2, ViewChild,
  ViewChildren
} from "@angular/core";
import {PeopleManageModel} from "./pm-peoplemanage.model";
import {add} from "./pm-peoplemanage.animation";

@Component({
  selector: 'people-manage',
  templateUrl: './pm-peoplemanage.component.html',
  styleUrls: ['./pm-peoplemanage.component.scss'],
  animations: [add]
})
export class PmPeoplemanageComponent implements AfterViewInit {
  @Input() dataListModel: PeopleManageModel[] = [];
  @Input() searchList: any[] = [];
  @Input() roleField: string;
  @Input() displayOnly: boolean = true;

  @Input() datas: any[] = [];
  @Output() datasChange = new EventEmitter();

  @Output() outSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() outCreate: EventEmitter<any> = new EventEmitter<any>();
  @Output() outDelete: EventEmitter<any> = new EventEmitter<any>();


  post: any = 'dev';
  state: string;
  positions: any[];
  choosedData: any = '';

  @ViewChild('search')
  search: ElementRef;
  constructor(private ref: ElementRef, private Renderer: Renderer2) {

    this.state = 'inactive';
    this.positions = [
      { name: '开发人员', value: 'dev' },
      { name: '测试人员', value: 'test' }
    ];
  }

  ngAfterViewInit() {
    this.modifyStyle();
  }

  modifyStyle() {
    let width = (100 / this.dataListModel.length).toString().substr(0, 4) + '%';
    let cellList = this.ref.nativeElement.querySelectorAll('.item-cell');
    cellList.forEach(cell => {
      this.Renderer.setStyle(cell, 'width', width);
    });
  }

  delete(item: any) {
    this.datas = this.datas.filter(data => data !== item);
    this.outDelete.emit(item);
    this.datasChange.emit(this.datas);
  }

  create() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.choosedData[this.roleField] = this.post;
    if (!this.datas.some(item => item.name === this.choosedData.name)) {
      this.outCreate.emit(this.choosedData);
      this.datas.push(this.choosedData);
      this.datasChange.emit(this.datas);
      setTimeout( () => {
        this.modifyStyle();
      }, 0);
      this.searchList = [];
      this.choosedData = '';
    } else {
      alert('人员添加重复');
    }

  }

  changeState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  closeAdd() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.searchList = [];
  }

  emitSearch(str: any) {
    this.outSearch.emit(str);
  }

  select(data: any) {
    this.choosedData = data;
  }
}
