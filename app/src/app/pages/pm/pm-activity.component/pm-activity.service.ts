import {Injectable} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {Http} from "@angular/http";

@Injectable()
export class PmActivityService {
  memberUrl: string;
  projectDetailUrl: string;
  updateProjectUrl: string;
  fuzzyQueryUrl: string;
  memberAddUrl: string;
  memberDeleteUrl: string;
  constructor(private http: Http, private Global: GlobalState) {
    this.memberUrl = '/api/project/' + sessionStorage.getItem('projectId') + '/user';
    this.projectDetailUrl = '/api/project/' + sessionStorage.getItem('projectId');
    this.updateProjectUrl = '/api/project/' + sessionStorage.getItem('projectId');
    this.fuzzyQueryUrl = '/api/project/member';
    this.memberAddUrl = '/api/project/member';
    this.memberDeleteUrl = '/api/project/member';
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
    };
    return this.http.get(this.fuzzyQueryUrl, {params})
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  memberAdd(id: string, role: string): Promise<any> {
    const body = {
      id: id,
      role: role,
      projectId: sessionStorage.getItem('projectId')
    };
    return this.http.post(this.memberAddUrl, body)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }

  memberDelete(id: string): Promise<any> {
    const params = {
      id: id,
    };
    return this.http.delete(this.memberDeleteUrl, {params})
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError);
  }
}
