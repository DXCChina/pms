import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WelcomeService {

  private projectListUrl = 'api/project';

  constructor(private http: Http) {
  }

  getProjectList(): Promise<any> {
    return this.http.get(this.projectListUrl).toPromise()
      .then(response => {
        return response.json();
      })
      .catch(this.handleError)
  }

  handleError(error: any) {
    return Promise.reject(error.message || error)
  }
}
