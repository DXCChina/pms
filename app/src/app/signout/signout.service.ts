import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { GlobalState } from "../global.state";

@Injectable()
export class SignoutService {
  constructor(private http: Http, private global: GlobalState) { }

  signout(): Promise<any> {
    let url = `${this.global.baseURL}/api/logout`;
    return this.http.get(url).toPromise()
      .then(response => console.log(response))
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
