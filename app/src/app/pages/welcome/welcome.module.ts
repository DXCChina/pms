import {NgModule} from "@angular/core";
import {routing} from "./welcome.routing";
import {WelcomeComponent} from "./welcome.component";
import {NgaModule} from "../../theme/nga.module";
import {MatButtonModule, MatCardModule} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ToasterModule} from "angular2-toaster";
import { MatDialogModule, MatInputModule } from '@angular/material';
import { DialogCreateProjectComponent } from './dialog-create-project/dialog-create-project.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    ToasterModule
  ],
  declarations: [
    WelcomeComponent,
    DialogCreateProjectComponent,
  ],
  entryComponents: [
    DialogCreateProjectComponent
  ],

  providers: [

  ]
})

export class WelcomeModule {

}
