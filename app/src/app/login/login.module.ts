import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {routing} from "./login.routing";
import {Login} from "./login.component";
import {NgaModule} from "../theme/nga.module";
import {ToasterModule} from "angular2-toaster";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgaModule,
    routing,
    ToasterModule,
  ],
  declarations: [
    Login
  ]
})
export class LoginModule {}
