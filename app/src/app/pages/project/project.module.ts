import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgJhipsterModule } from 'ng-jhipster';

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';

import { NgaModule } from '../../theme/nga.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { routing } from './project.routing';
import { Detail_memberService } from '../detail_member.service';
import { ProjectComponent } from './project.component';
import { TableViewComponent } from './table-view/table-view.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing,
    MatButtonModule,
    NgxDatatableModule,
    NgJhipsterModule.forRoot({
      // set below to true to make alerts look like toast
      alertAsToast: false,
    }),

    MatCommonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatTabsModule,
    MatListModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatGridListModule,
    MatCommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatProgressBarModule,
    MatToolbarModule
  ],
  declarations: [
    ProjectComponent
  ],
  entryComponents: [

  ],
  providers: [
    Detail_memberService
  ]
})
export class ProjectModule { }
