import {
  AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, QueryList, Renderer2, ViewChild,
  ViewChildren
} from "@angular/core";
import {PeopleManageModel} from "./pm-peoplemanage.model";
import {add} from "./pm-peoplemanage.animation";

@Component({
  selector: 'pm-people-manage',
  templateUrl: './pm-peoplemanage.component.html',
  styleUrls: ['./pm-peoplemanage.component.scss'],
  animations: [add]
})
export class PmPeoplemanageComponent implements AfterViewInit {
  dataListModel: PeopleManageModel[] = [];
  post: any = 'pm';
  datas: any[] = [];

  searchList: any[] = [];
  state: string;
  positions: any[];

  choosedData: any;

  @ViewChild('search')
  search: ElementRef;
  constructor(private ref: ElementRef, private Renderer: Renderer2) {
        this.dataListModel = [
      { name: '姓名', value: 'name' },
      { name: '职位', value: 'job' },
      { name: '邮箱', value: 'email' },
      { name: '时间', value: 'date' },
    ];
    this.datas = [
      {
        name: 'pm',
        job: 'pm',
        email: 'jerry@hpe.com',
        date: '2017/11/22',
        id: 'sdfasfsf',
      },
      {
        name: 'tom',
        job: 'dev',
        email: 'tom@hpe.com',
        date: '2017/11/23',
        id: 'sfaswe',
      },
      {
        name: 'diner',
        job: 'test',
        email: 'diner@hpe.com',
        date: '2017/11/21',
        id: 'sfaswe',
      }
    ];
    this.state = 'inactive';
    this.positions = [
      { name: '项目经理', value: 'pm' },
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
  }

  create() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.choosedData.job = this.post;
    this.datas.push(this.choosedData);
    setTimeout( () => {
      this.modifyStyle();
    }, 0);
    this.searchList = [];
  }

  changeState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
  }

  closeAdd() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.searchList = [];
  }

  emitSearch(str: any) {

    if(str === 'qwer') {
      this.searchList = [
        {
          name: 'qwer',
          job: 'pm',
          email: 'qwer@hpe.com',
          date: '2017/11/23',
          id: 'sdfsdfsafas',
        },
        {
          name: 'QWER',
          job: 'dev',
          email: 'QWER@hpe.com',
          date: '2017/11/22',
          id: 'sddfsffsdd',
        }
      ];
    } else {
      this.searchList = [];
    }
  }

  select(data: any) {
    this.choosedData = data;
  }
}
