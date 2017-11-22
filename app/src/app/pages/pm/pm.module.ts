import { NgModule } from '@angular/core';
import { NgaModule } from '../../theme/nga.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { routing } from './pm.routing';
import { PmDashboardComponent } from './pm-dashboard.component/pm-dashboard.component';
import { PmDemandComponent } from './pm-demand.component/pm-demand.component';
import { PmComponent } from './pm.component';
import { PmActivityComponent } from './pm-activity.component/pm-activity.component';

@NgModule({
  declarations: [
    PmComponent,
    PmDashboardComponent,
    PmDemandComponent,
    PmActivityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  providers: [

  ]
})
export class PmModule { }
