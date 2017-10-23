import {Component,Input, OnInit, Output, EventEmitter} from "@angular/core";
import {Device} from "./device.Entity";
import {Statistic} from "./statistic.Entity";
import {DeviceManageService} from "./device-manage.service";

@Component({
  selector: "device-manage",
  templateUrl: './device-manage.html',
  styleUrls: ['./device-manage.css'],
  providers:[DeviceManageService]
})

export class DeviceManageComponent implements OnInit{
  @Input() where: string;
  @Input() deviceControl:boolean = false;
  @Output() checkedDeviceChange = new EventEmitter();

  checkedDevice:  any[];

  devices: any[];
  viewDevices: any[] = [];

  statistics: Statistic = new Statistic(99, 56, 34, 3);

  brandState: string = '';
  platformState: string = '';
  systemState: string = '';

  firmFilterStates: any[] = [{name: "ZTE"},{name: "google"}];
  platformFilterStates: any[] = [{code: 0, name: "安卓"}];
  systemFilterStates: any[] = [{code: 0, name: "系统1"}];

  checked: boolean = false;

  tabIndex: number = 0;
  dev: string = '请选择一个设备';

  page: number = 1;
  size: number = 20;
  sortField: string = 'id';
  sortOrder: string = 'asc';

  constructor(private _service:DeviceManageService) {
  }

  ngOnInit(){
    this.getDeviceList();
  }

  nextDeviceTab(dev: Device) {
    if(!this.deviceControl){
      // this.tabIndex = 1;
      // this.dev = "当前设备为" + dev.osName;
      this.checkedDevice = [];
      this.checkedDevice.push(dev);
    }else {
      this.checkedDevice = this.devices.filter(dev => dev.checked === true);
    }

    this.checkedDeviceChange.emit(this.checkedDevice);
  }

  getDeviceList(){
    let params = [
      `page=${this.page}`,
      `size=${this.size}`,
      `sortField=${this.sortField}`,
      `sortOrder=${this.sortOrder}`
    ].join('&');

    if(this.where === 'inProject'){
      this._service.getDeviceInProject()
        .then(res => {
          console.log(res.data)
          this.viewDevices = this.devices = res.data;
        }, err => {
          console.log(err)
        })
    }else if(this.where === 'outProject'){
      this._service.getDeviceList(params)
        .then(res=>{
          this.viewDevices = this.devices = res.data.pages;
        });
    }
  }

  findDeviceInState() {
    let devices = this.devices;

    if(this.brandState){
      this.viewDevices = devices = devices.filter(dev => dev.brand == this.brandState);
    }
    if(this.platformState){
      this.viewDevices = devices = devices.filter(dev => dev.model == this.platformState);
    }
    if(this.systemState){
      this.viewDevices = devices = devices.filter(dev => dev.model == this.systemState);
    }
  }
}
