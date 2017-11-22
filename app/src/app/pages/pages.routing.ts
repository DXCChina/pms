import {Routes, RouterModule}  from '@angular/router';
import {Pages} from './pages.component';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
  {
    path: 'pages',
    component: Pages,
    children: [
      {
        path: 'project',
        loadChildren: "app/pages/engineering/engineering.module#EngineeringModule"
      },
      {
        path: 'welcome',
        loadChildren: "app/pages/welcome/welcome.module#WelcomeModule"
      },
      {
        path: 'user',
        loadChildren: "app/pages/user/user.module#UserModule"
      },
      {
        path: 'pm',
        loadChildren: "app/pages/pm/pm.module#PmModule"
      },
      {
        path: 'dev',
        loadChildren: "app/pages/dev/dev.module#DevModule"
      },
      {
        path: 'test',
        loadChildren: "app/pages/test/test.module#TestModule"
      },
      {path: '', redirectTo: 'welcome', pathMatch: 'full'}
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
