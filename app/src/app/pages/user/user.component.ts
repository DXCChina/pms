import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { EmailValidator } from "../../theme/validators/email.validator";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
import { ToasterConfig, ToasterService } from "angular2-toaster";

@Component({
  selector: 'user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  providers: [UserService]
})
export class User implements OnInit {

  public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public user: any;

  toasterconfig: ToasterConfig = new ToasterConfig({});

  constructor(private service: UserService, private router: Router, private toasterService: ToasterService) {

    this.form = new FormGroup({
      'name': new FormControl('', Validators.compose([Validators.required, Validators.minLength(4)])),
      'email': new FormControl('', Validators.compose([Validators.required, EmailValidator.validate])),
    });
    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
  }

  getCurrentUserInfo() {
    this.service.user_info()
      .then(res => {
        if (res.id !== '') {
          this.user = res;
          this.form.setValue({name: res.username, email: res.email});
          
        } else {
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        console.log(err);
        this.router.navigate(['/login']);
      })
  }
  onSubmit(): void {
    console.log(this.name.value, this.email.value)
    this.service.user_update(this.name.value, this.email.value)
      .then(res => {
        if (res.msg) {
          this.toasterService.pop('error', res.msg);
        } else {
          this.toasterService.pop('success', '更新成功');
        }
      }, err => {
        this.toasterService.pop('error', '更新失败', JSON.parse(err._body).msg[1]);
      })
  }

  ngOnInit() {
    this.getCurrentUserInfo();
  }

}
