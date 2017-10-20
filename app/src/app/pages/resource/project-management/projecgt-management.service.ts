import {Injectable} from "@angular/core";
import {InterceptableHttp} from "ng-http-interceptor";
import {Project} from "./project.Entity";
import {GlobalState} from "../../../global.state";

@Injectable()
export class ProjectManageService {

  createProjectUrl = this.Global.baseURL + '/api/project/save';

  constructor(private _http: InterceptableHttp ,private Global: GlobalState){
  }

  getProjectDetail(url: string): Promise<any> {
    return this._http.get(url)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  getProjectList(url: string): Promise<Project> {
    return this._http.get(url)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  deleteProjects(url: string, ids: any[]): Promise<any> {
    let body = {ids};
    return this._http.post( url, body, this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  getMembers(url: string): Promise<any> {
    return this._http.get(url)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  fuzzyQuery(url: string): Promise<any> {
    return this._http.get(url)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  memberControl(url: string, projectId: string, usernames: string[]): Promise<any>{
    let body = {projectId ,usernames};
    return this._http.post(url ,body , this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

  saveProject(projectId: string, description: string, projectName: string, members: string[]): Promise<any> {
    let body = { projectId, description, projectName, members};
    return this._http.post(this.createProjectUrl, body , this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }
}
