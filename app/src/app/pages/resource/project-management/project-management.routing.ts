import {RouterModule, Routes} from "@angular/router";
import {ProjectManagementComponent} from "./project-management.component";
import {ModuleWithProviders} from "@angular/core";

export const routes : Routes = [
  {
    path : '' , redirectTo : 'project' , pathMatch : 'full'
  },
  {
    path : '', component : ProjectManagementComponent
  }
];

export const routing : ModuleWithProviders = RouterModule.forChild(routes);
