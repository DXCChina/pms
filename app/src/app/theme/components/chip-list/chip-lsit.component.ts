/**
 * Created by gaole on 2017/11/22.
 */
import {Component, Input, EventEmitter, Output} from "@angular/core";
@Component({
  selector: 'chip-list',
  templateUrl:'chip-list.component.html',
  styleUrls:['chip-list.component.scss']
})

export class ChipListComponent{
  @Input() chipList: any = [];
  @Input() selectable:boolean = true;
  @Input() removable:boolean = true;

  @Output() removeChip:EventEmitter<any>= new EventEmitter<any>();
  removeChipEle:any;

  remove(role: any): void {
    let index = this.chipList.indexOf(role);

    if (index >= 0) {
      this.removeChipEle = this.chipList.splice(index, 1);
    }

    this.removeChip.emit(this.removeChipEle[0]);
  }
}
