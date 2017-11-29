import {Injectable} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {Http} from "@angular/http";

@Injectable()
export class PmActivityService {
  memberUrl: string;
  projectDetailUrl: string;
  updateProjectUrl: string;
  fuzzyQueryUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.memberUrl = '/api/project/' + sessionStorage.getItem('projectId') + '/user';
    this.projectDetailUrl = '/api/project/' + sessionStorage.getItem('projectId');
    this.updateProjectUrl = '/api/project/' + sessionStorage.getItem('projectId');
    this.fuzzyQueryUrl = '/api/project/name'
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

  fuzzyQuery(search: string): Promise<any> {
    const params = {
      name: search
    }
    return this.http.get(this.fuzzyQueryUrl, {params})
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }
}
