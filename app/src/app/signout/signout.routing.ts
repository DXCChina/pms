import { Routes, RouterModule } from '@angular/router';

import { ModuleWithProviders } from '@angular/core';
import { Signout } from "./signout.component";

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: 'signout',
    component: Signout
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
