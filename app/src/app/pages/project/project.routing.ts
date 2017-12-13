import {Routes, RouterModule}  from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {Project} from "./project.component";

export const routes: Routes = [
  {
    path: '',
    component: Project,
    children: [
      {
        path: 'pm',
        loadChildren: "app/pages/project/pm/pm.module#PmModule"
      },
      {
        path: 'dev',
        loadChildren: "app/pages/project/dev/dev.module#DevModule"
      },
      {
        path: 'test',
        loadChildren: "app/pages/project/test/test.module#TestModule"
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
