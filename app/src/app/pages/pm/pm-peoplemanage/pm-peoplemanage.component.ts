import {AfterViewInit, Component, ElementRef, Input, QueryList, Renderer2, ViewChildren} from "@angular/core";
import {PeopleManageModel} from "./pm-peoplemanage.model";

@Component({
  selector: 'pm-people-manage',
  templateUrl: './pm-peoplemanage.component.html',
  styleUrls: ['./pm-peoplemanage.component.scss']
})
export class PmPeoplemanageComponent implements AfterViewInit{
  @Input() dataListModel: PeopleManageModel[] = [];
  @Input() data: any[] = [];
  constructor(private ref: ElementRef, private Renderer: Renderer2) {
  }

  ngAfterViewInit() {
    let width = (100 / this.dataListModel.length).toString().substr(0, 4) + '%';
    let cellList = this.ref.nativeElement.querySelectorAll('.item-cell');
    cellList.forEach(cell => {
      this.Renderer.setStyle(cell, 'width', width);
    })
  }
}
