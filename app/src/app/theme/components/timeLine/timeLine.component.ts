import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'time-line',
  templateUrl: 'timeLine.component.html',
  styleUrls: ['timeLine.component.scss']
})
export class TimeLineComponent {
  @Input() timeLine: any[];
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.timeLine = [];
  }

  checked(item: any) {
    this.select.emit(item);
  }
}
