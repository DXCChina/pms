import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {GlobalState} from "../global.state";

/**
 * Created by yxin on 7/29/2017.
 */
@Injectable()
export class LoginService {
  constructor(private http: Http, private global: GlobalState) {}

  login(username: string, password: string): Promise<any> {
    let url = `${this.global.baseURL}/auth/login`;
    let body = {
      username: username,
      password: password
    };
    return this.http.post(url, body).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
