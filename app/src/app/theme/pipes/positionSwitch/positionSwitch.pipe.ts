import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'positionSwitch'})
export class PositionSwitchPipe implements PipeTransform {
  transform(input: string) {
    let position;
    if (input === 'pm') {
      position = '项目经理'
    } else if (input === 'dev') {
      position = '开发人员'
    } else if (input === 'test') {
      position = '测试人员'
    } else {
      position = input;
    }
    return position;
  }
}
