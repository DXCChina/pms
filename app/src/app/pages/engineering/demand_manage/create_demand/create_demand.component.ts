import {Component} from "@angular/core";
import './ckeditor.load'
import 'ckeditor'

@Component({
  selector: 'create-demand',
  templateUrl: './create_demand.html',
  styleUrls: ['./create_demand.scss']
})
export class CreateDemandComponent {

  createType: string;
  expanded: boolean;
  content: string = `<p>Hello <strong>World !!!</strong></p>`;

  status: string = 'new';
  level: string = 'normal';
  assign: string = 'self';

  constructor() {

  }

  setType(type: string) {
    this.createType = type;
    this.expanded = false;
  }

  openExpand(bool: boolean) {
    this.expanded = bool;
  }
}
