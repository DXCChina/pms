import {Injectable} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {Http} from "@angular/http";

@Injectable()
export class PmActivityService {
  memberUrl: string;
  projectDetailUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.memberUrl = '/api/project/' + sessionStorage.getItem('projectId') + '/user';
    this.projectDetailUrl = '/api/project/name/' + sessionStorage.getItem('projectId');
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
}
