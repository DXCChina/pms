import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalState} from "../../../global.state";

@Injectable()
export class ReleaseManageService {
  createReleaseUrl: string;
  getReleaseListUrl: string;
  updateReleaseUrl: string;
  deleteReleaseUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.createReleaseUrl = '/api/release';
    this.getReleaseListUrl = '/api/release';
    this.updateReleaseUrl = '/api/release';
    this.deleteReleaseUrl = '/api/release/';
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

  updateRelease(title: string, content: string, id: number): Promise<any> {
    const body = {title, content, id};
    return this.http.put(this.updateReleaseUrl, body)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  deleteRelease(id: number): Promise<any> {
    const url = this.deleteReleaseUrl + id;
    return this.http.delete(url)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }
}
