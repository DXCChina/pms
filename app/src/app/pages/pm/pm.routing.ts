import {RouterModule, Routes} from "@angular/router";
import {PmComponent} from "./pm.component";
import {ModuleWithProviders} from "@angular/core";
import {PmDashboardComponent} from "./pm-dashboard.component/pm-dashboard.component";
import {PmDemandComponent} from "./pm-demand.component/pm-demand.component";
import {PmActivityComponent} from "./pm-activity.component/pm-activity.component";

export const routes: Routes = [
  {
    path: '',
    component: PmComponent,
    children: [
      {
        path: 'dashboard',
        component: PmDashboardComponent
      },
      {
        path: 'demand',
        component: PmDemandComponent
      },
      {
        path: 'activity',
        component: PmActivityComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
