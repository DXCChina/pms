import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from "./user.routing";
import { User } from "./user.component";
import { ToasterModule } from "angular2-toaster";
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatListModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    routing,
    ToasterModule,
  ],
  declarations: [
    User
  ]
})
export class UserModule { }
