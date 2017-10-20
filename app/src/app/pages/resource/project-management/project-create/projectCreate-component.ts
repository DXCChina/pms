import {Component} from "@angular/core";
import {routerDisplay} from "../../../common/animations/animations";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {GlobalState} from "../../../../global.state";
import {ProjectManageService} from "../projecgt-management.service";
import {ToasterService} from "angular2-toaster";
import {JhiEventManager} from "ng-jhipster";

@Component({
  selector: 'project-create',
  templateUrl: './project-create.html',
  styleUrls: ['./project-create.scss'],
  animations: [
    routerDisplay
  ]
})
export class ProjectCreateComponent {
  form: FormGroup;
  proName: AbstractControl;
  description: AbstractControl;
  judgeTitle: boolean = this.Global.createJudge.title;

  constructor( private fb: FormBuilder, private router: Router, private Global: GlobalState,
               private service: ProjectManageService, private toasterService: ToasterService, private eventManager: JhiEventManager){
    this.form = this.fb.group({
      "proName": [this.Global.createJudge.projectName, Validators.compose([Validators.required, Validators.minLength(1)])],
      "description": [this.Global.createJudge.description],
    });
    this.proName = this.form.controls['proName'];
    this.description = this.form.controls['description'];
  }

  onSubmit(){
    this.service.saveProject(this.Global.createJudge.projectId, this.description.value, this.proName.value,this.Global.createJudge.members)
      .then( res => {
        this.eventManager.broadcast({name: 'projectSave', content: 'OK'});
        if(this.Global.createJudge.projectId){
          this.toasterService.pop('success', '项目修改成功', 'Project modified success!');
        }else{
          this.toasterService.pop('success', '项目创建成功', 'Project created success!');
        }
      }, err => {
        console.log(err)
      });
    this.router.navigate(['/pages/resource/projectMan']);
    return false;
  }

  cancelCreate(){
    this.Global.createJudge.title = true;
    if(this.Global.createJudge.position){
      this.router.navigate(['/pages/welcome'])
    }else{
      this.router.navigate(['/pages/resource/projectMan'])
    }
    return false;
  }

}
