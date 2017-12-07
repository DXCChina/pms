import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ListMetrics } from './list-metrics';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss'],
  providers: []
})
export class ListCardComponent implements OnInit, OnChanges {

  @Input() data: ListMetrics[];
  @Input() canAdd: boolean;
  @Output() showDetail: EventEmitter<any> = new EventEmitter<any>();
  @Output() addItem: EventEmitter<any> = new EventEmitter<any>();

  public colorArr: string[] = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722', '#795548', '#9e9e9e', '#607d8b',
  ];

  public activeData: any;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data.length) {
      this.changeCardData(this.data[0]);
    }
  }

  changeCardData(list) {
    this.activeData = list;
    this.activeData.listData.map(item => {
      item.itemAvatar = this.colorArr[Math.floor(Math.random() * (this.colorArr.length - 1))];
    });
  }

  addEmit() {
    if (this.canAdd) {
      this.addItem.emit();
    }
  }

  detailEmit(item: Object) {
    this.showDetail.emit(item);
  }

}
