import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {EngineeringComponent} from "./engineering.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DemandManageComponent} from "./demand_manage/demand-manage.component";
// import {ReportManageComponent} from "./report_manage/report-manage.component";

export const routes: Routes = [
  {
    path: '',
    component: EngineeringComponent,
    children: [
      {
        path: 'dashboard', component: DashboardComponent
      },
      {
        path: 'demand', component: DemandManageComponent
      },
      // {
      //   path: 'report', component: ReportManageComponent
      // },
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
      }
    ]
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
