import {Routes, RouterModule}  from '@angular/router';
import {Pages} from './pages.component';
import {ModuleWithProviders} from '@angular/core';
import {WelcomeComponent} from "./welcome/welcome.component";
import {ResourceComponent} from "./resource/resource.component";
import {EngineeringComponent} from "./engineering/engineering.component";
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      // {path: 'welcome', component: WelcomeComponent},
      // {path: 'resource', component: ResourceComponent},
      // {path: 'engineering', component: EngineeringComponent},
      {
        path: 'resource',
        loadChildren: "app/pages/resource/resource.module#ResourceModule"
      },
      {
        path: 'project',
        loadChildren: "app/pages/engineering/engineering.module#EngineeringModule"
      },
      {
        path: 'welcome',
        loadChildren: "app/pages/welcome/welcome.module#WelcomeModule"
      },
      {path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
