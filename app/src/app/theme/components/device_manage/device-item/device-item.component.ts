import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from "@angular/core";
import construct = Reflect.construct;
import {Device} from "../device.Entity";

@Component({
  selector: 'device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['device-item.component.scss']
})
export class DeviceItemComponent implements OnInit,OnChanges {
  @Input() dev: Device;
  @Input() checked: boolean;
  @Input() deviceControl: boolean;
  @Output() devChange = new EventEmitter();

  showBkgsClass: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.deviceControl) {
      this.showBkgsClass = this.checked ? true : false;
    }
  }

  selectedDevice() {
    if (this.deviceControl) {
      this.dev.checked = this.showBkgsClass = !this.showBkgsClass;
    }
    this.devChange.emit(this.dev);
  }
}


