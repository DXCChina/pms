import {Component, ViewContainerRef} from "@angular/core";
import 'rxjs/Rx'


/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styleUrls: ['./app.component.scss'],
  template: `
    <main baThemeRun>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {

  constructor(){

  }
}

