import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule, MatTooltipModule, MatFormFieldModule, MatAutocompleteModule
} from '@angular/material';
import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToasterModule } from 'angular2-toaster';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { routing } from './project.routing';
import { ProjectComponent } from './project.component';
import { TableViewComponent } from './table-view/table-view.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';

import { DemandManageComponent } from './demand-manage/demand-manage.component';
import { DevSetManageComponent } from './dev-set-manage/dev-set-manage.component';
import { TestManageComponent } from './test-manage/test-manage.component';
import { TestSetManageComponent } from './test-set-manage/test-set-manage.component';
import { BugManageComponent } from './bug-manage/bug-manage.component';

import { DemandDetailComponent } from './demand-manage/demand-detail/demand-detail.component';
import { DevSetDetailComponent } from './dev-set-manage/dev-set-detail/dev-set-detail.component';
import { TestCaseDetailComponent } from './test-manage/test-case-detail/test-case-detail.component';
import { TestSetDetailComponent } from './test-set-manage/test-set-detail/test-set-detail.component';
import { BugDetailComponent } from './bug-manage/bug-detail/bug-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    MatButtonModule,
    NgxDatatableModule,
    ToasterModule,
    FroalaEditorModule,
    FroalaViewModule,

    MatCommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  declarations: [
    ProjectComponent,
    TableViewComponent,
    DashboardViewComponent,
    DemandManageComponent,
    DevSetManageComponent,
    TestManageComponent,
    TestSetManageComponent,
    BugManageComponent,
    DemandDetailComponent,
    DevSetDetailComponent,
    TestCaseDetailComponent,
    TestSetDetailComponent,
    BugDetailComponent
  ],
  entryComponents: [

  ],
  providers: [
  ]
})
export class ProjectModule { }
