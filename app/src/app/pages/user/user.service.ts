import {Injectable} from "@angular/core";
import {GlobalState} from "../../global.state";
import {Http} from "@angular/http";

@Injectable()
export class UserService {

  private UserUrl = this.Global.baseURL + '/api/user';

  constructor(private Global: GlobalState, private http: Http){

  }

  user_info(): Promise<any> {
    return this.http.get(this.UserUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }
  user_update(username: string, email: string): Promise<any> {
    let body = {username, email};
    return this.http.put(this.UserUrl, body)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

}
