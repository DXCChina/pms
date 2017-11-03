import { NgModule } from '@angular/core';
import { routing } from "./signout.routing";
import { Signout } from "./signout.component";

@NgModule({
  imports: [
    routing,
  ],
  declarations: [
    Signout
  ]
})
export class SignoutModule { }
