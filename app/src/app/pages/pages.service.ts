import {Injectable} from "@angular/core";
import {GlobalState} from "../global.state";
import {Http} from "@angular/http";

@Injectable()
export class PagesService {

  private AppUrl = this.Global.baseURL + '/api/user';

  constructor(private Global: GlobalState, private http: Http){

  }

  user_info(): Promise<any> {
    return this.http.get(this.AppUrl)
      .toPromise()
      .then(this.Global.extractData)
      .catch(this.Global.handleError)
  }

}
