import {Injectable} from "@angular/core";
import {GlobalState} from "../global.state";
import {Http} from "@angular/http";

@Injectable()
export class RegisterService {

  private RegisterUrl = this.Global.baseURL + '/account/register';

  constructor(private Global: GlobalState, private http: Http){

  }

  register(username: string, password: string, email: string): Promise<any> {
    let body = {username, password, email};
    return this.http.post(this.RegisterUrl, body, this.Global.options)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

}
