import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WelcomeService {

  private projectUrl = 'api/project';

  constructor(private http: Http) {
  }

  getProjectList(): Promise<any> {
    return this.http.get(this.projectUrl).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError)
  }

  newProject(project: any): Promise<any> {
    return this.http.post(this.projectUrl, project).toPromise()
      .then(response => response.json())
      .catch(this.handleError)
  }

  handleError(error: any) {
    return Promise.reject(error.message || error)
  }
}
