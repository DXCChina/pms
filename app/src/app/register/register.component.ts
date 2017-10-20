import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

import 'style-loader!./register.scss';
import {EmailValidator} from "../theme/validators/email.validator";
import {EqualPasswordsValidator} from "../theme/validators/equalPasswords.validator";
import {RegisterService} from "./register.service";
import {Router} from "@angular/router";
import {ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: 'register',
  templateUrl: './register.html',
  styleUrls:['./register.css'],
  providers: [RegisterService]
})
export class Register {

  public form:FormGroup;
  public name:AbstractControl;
  public email:AbstractControl;
  public password:AbstractControl;
  public repeatPassword:AbstractControl;
  public passwords:FormGroup;

  public submitted:boolean = false;

  toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: false,
      showCloseButton: true
    });

  constructor(fb:FormBuilder, private elementRef:ElementRef, private Renderer: Renderer2,
              private service: RegisterService, private router: Router, private toasterService: ToasterService) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': ['', Validators.compose([Validators.required, EmailValidator.validate])],
      'passwords': fb.group({
        'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
        'repeatPassword': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
      }, {validator: EqualPasswordsValidator.validate('password', 'repeatPassword')})
    });

    this.name = this.form.controls['name'];
    this.email = this.form.controls['email'];
    this.passwords = <FormGroup> this.form.controls['passwords'];
    this.password = this.passwords.controls['password'];
    this.repeatPassword = this.passwords.controls['repeatPassword'];
  }

  onSubmit(): void{

    // let submit: HTMLElement = this.elementRef.nativeElement.querySelector('#re-register');
    // this.Renderer.s

    this.service.register(this.name.value, this.password.value, this.email.value)
      .then(res => {
        console.log(res)
        if(res.code === 0){
          this.router.navigate(['/login']);
        }else {
          this.toasterService.pop('error', res.message , '注册失败');
        }
      }, err => {
        console.log(err)
      })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event){

    let header : HTMLElement = this.elementRef.nativeElement.querySelector('#header');
    let content : HTMLElement = this.elementRef.nativeElement.querySelector('#content');
    let register : HTMLElement = this.elementRef.nativeElement.querySelector('#RegisterPart');

    if( header.scrollHeight > content.scrollHeight) {
      // content.style.marginTop = (header.scrollHeight - content.scrollHeight) / 2 + 20 + 'px';
      this.Renderer.setStyle(content,'marginTop', "(header.scrollHeight - content.scrollHeight)/2 + 20 + 'px'");
    }

    if( screen.width < 1920 && screen.height < 1080) {

      this.Renderer.setStyle(content,'width','980px');
      this.Renderer.setStyle(content,'height','560px');
      this.Renderer.setStyle(content,'minWidth','980px');
      this.Renderer.setStyle(register,'top','120px')
    }
  }
  ngOnInit(){
    this.onResize(event);
  }

}
