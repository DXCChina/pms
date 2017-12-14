import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from "./project-manage.routing";
import {ProjectManageComponent} from "./project-manage.component";
import {ReleaseManageComponent} from "./release-manage/release-manage.component";
import { ProjectViewComponent } from './project-view/project-view.component';
import {
  MatChipsModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatButtonModule,
  MatFormFieldModule
} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    NgaModule,
    MatChipsModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
  declarations: [
    ProjectManageComponent,
    ReleaseManageComponent,
    ProjectViewComponent
  ]
})
export class ProjectManageModule { }
