import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {routing} from "./user.routing";
import {User} from "./user.component";
import {ToasterModule} from "angular2-toaster";

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    routing,
    ToasterModule,
  ],
  declarations: [
    User
  ]
})
export class UserModule {}
