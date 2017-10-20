import {Component, OnInit} from "@angular/core";
import {WelcomeService} from "./welcome.service";
import {WelcomeData} from "./welcome.Entity";
@Component({
  selector:'welcome',
  templateUrl:'./welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})

export class WelcomeComponent implements OnInit {

  welcomeData: WelcomeData;

  constructor(private service: WelcomeService) {

  }

  ngOnInit(){
    this.welcomeInfo();
  }

  welcomeInfo(){
    this.service.welcomeInfo()
      .then(res => {
        this.welcomeData = res.data
      }, err => {
        console.log(err)
      })
      .catch()
  }

  chooseDevice(device: any){
    console.log(device)
  }
}

