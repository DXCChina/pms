import {Injectable} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {Http} from "@angular/http";

@Injectable()
export class PmActivityService {
  memberUrl: string;
  projectDetailUrl: string;
  updateProjectUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.memberUrl = '/api/project/' + sessionStorage.getItem('projectId') + '/user';
    this.projectDetailUrl = '/api/project/' + sessionStorage.getItem('projectId');
    this.updateProjectUrl = '/api/project/' + sessionStorage.getItem('projectId');
  }

  getMember(): Promise<any> {
    return this.http.get(this.memberUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  getProjectDetail(): Promise<any> {
    return this.http.get(this.projectDetailUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  updateProject(body: any): Promise<any> {
    return this.http.put(this.updateProjectUrl, body)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }
}
