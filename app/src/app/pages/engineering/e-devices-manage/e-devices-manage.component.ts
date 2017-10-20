/**
 * Created by gaole on 2017/9/4.
 */
import {Component} from "@angular/core";

@Component({
  selector:'e-device',
  templateUrl: './e-devices.html',
  styleUrls: ['./e-devices.scss']
  // template:`<device-manage [where]="'inProject'"></device-manage>`
})
export class EDeviceManageComponent{

  tabIndex: number = 0;
  dev: string = '请选择一个设备';
  constructor(){

  }

  chooseDevice(device: any) {
    this.tabIndex = 1;
    this.dev = device.osName;
    console.log(device)
  }
}
