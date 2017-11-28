import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routing } from './pm.routing';

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule, MatMenuModule,
  MatProgressBarModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';

import { PmComponent } from './pm.component';
import { PmDashboardComponent } from './pm-dashboard.component/pm-dashboard.component';
import { PmActivityComponent } from './pm-activity.component/pm-activity.component';
import { PmPeoplemanageComponent } from '../../theme/components/pm-peoplemanage/pm-peoplemanage.component';

@NgModule({
  declarations: [
    PmComponent,
    PmDashboardComponent,
    PmActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,

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
  providers: [

  ],
  entryComponents: [

  ]
})
export class PmModule { }
