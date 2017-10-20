import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {routing} from "./resource.routing";
import {ResourceComponent} from "./resource.component";
import {ProjectManagementComponent} from "./project-management/project-management.component";
import {
  MdButtonModule, MdCardModule, MdCheckboxModule, MdChipsModule, MdDialogModule, MdInputModule, MdListModule,
  MdSelectModule,MdTabsModule,
  MdTooltipModule
} from "@angular/material";

import {NgaModule} from "../../theme/nga.module";
import { PeopleManagementComponent } from './project-management/people-management/people-management.component';
import {ToasterModule} from "angular2-toaster";
import {ProjectCreateComponent} from "./project-management/project-create/projectCreate-component";

@NgModule({
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    MdTabsModule,
    MdButtonModule,
    MdDialogModule,
    MdTooltipModule,
    MdSelectModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdInputModule,
    MdListModule,
    ToasterModule
  ],
  declarations:[
    ResourceComponent,
    ProjectManagementComponent,
    PeopleManagementComponent,
    ProjectCreateComponent
  ],
  entryComponents:[
  ]
})
export class ResourceModule{
}
