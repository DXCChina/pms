import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

import { EmailValidator } from "../../theme/validators/email.validator";
import { EqualPasswordsValidator } from "../../theme/validators/equalPasswords.validator";
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

  // public form: FormGroup;
  public name: AbstractControl;
  public email: AbstractControl;
  public oldPassword: AbstractControl;
  public newPassword: AbstractControl;
  public repeatPassword: AbstractControl;
  public passwords: FormGroup;
  public user: any;

  toasterconfig: ToasterConfig = new ToasterConfig({});

  constructor(fb: FormBuilder, private service: UserService, private router: Router, private toasterService: ToasterService) {
    this.name = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, EmailValidator.validate]);
    this.oldPassword = new FormControl('', [Validators.required, Validators.minLength(4)]);
    this.passwords = fb.group({
      'newPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    }, { validator: EqualPasswordsValidator.validate('newPassword', 'repeatPassword') })
    this.newPassword = this.passwords.controls['newPassword'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  getNameMessage() {
    return this.name.hasError('required') ? '用户名不能为空' : '';
  }
  getEmailMessage() {
    return this.email.hasError('required') ? '邮箱不能为空' :
      this.email.hasError('email') ? '邮箱格式错误' : '';
  }
  getPasswordMessage(field) {
    if (!this[field].valid) return '密码不应少于4位'
  }
  getCurrentUserInfo() {
    this.service.user_info()
      .then(res => {
        if (res.id !== '') {
          this.name.setValue(res.username);
          this.email.setValue(res.email);
        } else {
          this.router.navigate(['/login']);
        }
      }).catch(err => {
        console.log(err);
        this.router.navigate(['/login']);
      })
  }
  onSubmit(): void {
    this.service.user_update({ username: this.name.value, email: this.email.value })
      .then(res => {
        if (res.msg) {
          this.toasterService.pop('error', res.msg);
        } else {
          this.toasterService.pop('success', '信息更新成功');
        }
      }, err => {
        this.toasterService.pop('error', '信息更新失败', JSON.parse(err._body).msg[1]);
      })
  }
  changePassword(): void {
    this.service.change_password({ old_password: this.oldPassword.value, new_password: this.newPassword.value })
      .then(res => {
        if (res.msg) {
          this.toasterService.pop('error', res.msg);
        } else {
          this.toasterService.pop('success', '密码修改成功');
        }
      }, err => {
        console.log(err)
        this.toasterService.pop('error', '密码修改失败', JSON.parse(err._body).msg);
      })
  }
  ngOnInit() {
    this.getCurrentUserInfo();
  }

}
