import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {routing} from "./project-manage.routing";
import {ProjectManageComponent} from "./project-manage.component";
import {ReleaseManageComponent} from "./release-manage/release-manage.component";
import { ProjectViewComponent } from './project-view/project-view.component';
import {
  MatChipsModule, MatCardModule, MatSelectModule, MatDatepickerModule, MatButtonModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatExpansionModule, MatIconModule
} from "@angular/material";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
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
    MatInputModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule
  ],
  declarations: [
    ProjectManageComponent,
    ReleaseManageComponent,
    ProjectViewComponent
  ]
})
export class ProjectManageModule { }
