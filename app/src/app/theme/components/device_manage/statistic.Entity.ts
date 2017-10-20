export class Statistic {

  total_devices : number;
  usable_devices : number;
  busy_devices : number;
  caster : number;

  constructor( total_devices : number, usable_devices : number,busy_devices : number,caster : number){

    this.total_devices = total_devices;
    this.usable_devices=usable_devices;
    this.busy_devices=busy_devices;
    this.caster=caster;
  }

}
