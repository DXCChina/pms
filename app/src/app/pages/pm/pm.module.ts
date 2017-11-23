import {NgModule} from "@angular/core";
import {NgaModule} from "../../theme/nga.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {routing} from "./pm.routing";

import {
  MatButtonModule, MatCommonModule, MatDialogModule, MatSelectModule, MatInputModule,
  MatTabsModule, MatCardModule, MatExpansionModule, MatCheckboxModule, MatSliderModule, MatListModule,
  MatProgressSpinnerModule, MatChipsModule, MatGridListModule, MatDatepickerModule, MatNativeDateModule,
  MatTooltipModule
} from "@angular/material";

import {PmComponent} from "./pm.component";
import {PmDashboardComponent} from "./pm-dashboard.component/pm-dashboard.component";
import {PmDemandComponent} from "./pm-demand.component/pm-demand.component";
import {PmActivityComponent} from "./pm-activity.component/pm-activity.component";
import {PmPeoplemanageComponent} from "./pm-peoplemanage/pm-peoplemanage.component";
import {D_tComponent} from "./pm-demand.component/demand_task.model/d_t.component";
import {CreateDemandComponent} from "./pm-demand.component/create_demand/create_demand.component";
import {DemandSearchComponent} from "../common/demandSearch/demandSearch.component";

@NgModule({
  declarations: [
    PmComponent,
    PmDashboardComponent,
    PmDemandComponent,
    PmActivityComponent,
    PmPeoplemanageComponent,
    D_tComponent,
    CreateDemandComponent
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
    MatNativeDateModule
  ],
  providers: [

  ],
  entryComponents:[
    // CreateDemandComponent
  ]
})
export class PmModule { }
