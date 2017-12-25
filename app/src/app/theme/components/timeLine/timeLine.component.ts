import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'time-line',
  templateUrl: 'timeLine.component.html',
  styleUrls: ['timeLine.component.scss']
})
export class TimeLineComponent {
  @Input() timeLine: any[];
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.timeLine = [];
  }

  selected(item: any) {
    this.select.emit(item);
  }

  edited(item: any) {
    this.edit.emit(item);
  }

  deleted(item: any) {
    this.delete.emit(item);
  }
}
