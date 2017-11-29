import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalState} from "../global.state";

@Injectable()
export class Detail_memberService {
  getProjectDetailUrl: string;
  memberUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.getProjectDetailUrl = '/api/project/' + sessionStorage.getItem('projectId');
    this.memberUrl = '/api/project/' + sessionStorage.getItem('projectId') + '/user';
  }

  getProjectDetail(): Promise<any> {
    return this.http.get(this.getProjectDetailUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  getMember(): Promise<any> {
    return this.http.get(this.memberUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }
}
