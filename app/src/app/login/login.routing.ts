import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import {Login} from "./login.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: 'login',
    component: Login
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
