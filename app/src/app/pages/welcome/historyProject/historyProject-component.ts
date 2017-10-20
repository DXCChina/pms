import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {GlobalState} from "../../../global.state";
import { WelcomeProjects} from "../welcome.Entity";

@Component({
  selector: 'history-project',
  templateUrl: './historyProject.html',
  styleUrls: ['./historyProject.scss']
})
export class HistoryProjectComponent {

  @Input() projects: WelcomeProjects[] = [];
  constructor(private router: Router, private Global: GlobalState){
      if(this.projects.length > 6) {
        this.projects = this.projects.slice(0,7);
      }
  }

  createPro(){
    this.Global.createJudge = {position: true, title: true, projectId: '', members: [], description: '', projectName: ''};
    this.router.navigate(['/pages/resource/projectMan', {outlets: {popup: 'new'}}])
  }

}

