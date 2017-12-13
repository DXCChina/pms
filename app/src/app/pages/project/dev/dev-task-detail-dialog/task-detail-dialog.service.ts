/**
 * Created by gaole on 2017/11/30.
 */
import {Injectable} from '@angular/core';
import {GlobalState} from '../../../../global.state';
import {Http} from '@angular/http';

@Injectable()
export class DevTaskDetailService {
  updateActivityUrl = this._global.baseURL + '/api/activity';

  constructor(private _global: GlobalState, private http: Http) {
  }

  updateTask(taskInfo) {
    return this.http.put(this.updateActivityUrl, JSON.stringify(taskInfo), this._global.options)
      .toPromise()
      .then(this._global.extractData)
      .catch(this._global.handleError)
  }
}
