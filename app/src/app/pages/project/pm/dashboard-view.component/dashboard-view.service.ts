import { Injectable } from '@angular/core';
import { GlobalState } from '../../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class DashboardViewService {
    URL: string = this._global.baseURL + '/api/dashboard';

    constructor(private _global: GlobalState, private http: Http) { }

    getViewData(pId: string, type: string): Promise<any> {
        return this.http.get(`${this.URL}/${pId}/${type}`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError);
    }
}
