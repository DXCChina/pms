import {RouterModule, Routes} from "@angular/router";
import {DevComponent} from "./dev.component";
import {ModuleWithProviders} from "@angular/core";
import {DevDashboardComponent} from "./dev-dashboard/dev-dashboard.component";
import {DevActivityComponent} from "./dev-activity/dev-activity.component";

export const routes: Routes = [
  {
    path: '',
    component: DevComponent,
    children: [
      {
        path: 'dashboard',
        component: DevDashboardComponent
      },
      {
        path: 'activity',
        component: DevActivityComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
