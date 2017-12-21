import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalState} from "../../../global.state";

@Injectable()
export class ReleaseManageService {
  createReleaseUrl: string;
  getReleaseListUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.createReleaseUrl = '/api/release';
    this.getReleaseListUrl = '/api/release';
  }

  createRelease(title: string, content: string): Promise<any> {
    const projectId = sessionStorage.getItem('projectId');
    const body = {title, content, projectId};
    return this.http.post(this.createReleaseUrl, body)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  getReleaseList(): Promise<any> {
    const params = {'projectId': sessionStorage.getItem('projectId')};
    return this.http.get(this.getReleaseListUrl, {params})
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }
}
