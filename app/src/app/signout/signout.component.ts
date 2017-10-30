import { SignoutService } from "./signout.service";
import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'signout',
  providers: [SignoutService],
  template: ''
})
export class Signout {

  constructor(private _service: SignoutService, private router: Router) {
  }
  ngOnInit() {
    this._service.signout().then(
      res => this.router.navigate(['/login'])
    ).catch(error => console.log(error))
  }
}
