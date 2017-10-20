import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {ResourceComponent} from "./resource.component";
import {ProjectManagementComponent} from "./project-management/project-management.component";
import {ProjectCreateComponent} from "./project-management/project-create/projectCreate-component";

export const routes:Routes = [
  {
    path : '',
    component : ResourceComponent,
    children : [
      {
        path : 'projectMan', component : ProjectManagementComponent,
        children: [
          { path: 'new', component: ProjectCreateComponent , outlet: 'popup'}
        ]
      },
      {
        path : '', redirectTo : 'projectMan', pathMatch : 'full'
      }
    ]
  }
];

export const routing:ModuleWithProviders = RouterModule.forChild(routes);
