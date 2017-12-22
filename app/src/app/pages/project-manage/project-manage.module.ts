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
import {ReactiveFormsModule} from "@angular/forms";
import {NgaModule} from "../../theme/nga.module";
import {ReleaseCreateComponent} from "./release-manage/release-create/release-create.component";
import {ReleaseManageService} from "./release-manage/release-manage.service";

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
    ProjectViewComponent,
    ReleaseCreateComponent
  ],
  providers: [
    ReleaseManageService
  ],
  entryComponents: [
    ReleaseCreateComponent
  ]
})
export class ProjectManageModule { }
