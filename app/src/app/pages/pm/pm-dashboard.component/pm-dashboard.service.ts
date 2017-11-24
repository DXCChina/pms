import { Injectable } from '@angular/core';
import { GlobalState } from '../../../global.state';
import { Http } from '@angular/http';

@Injectable()
export class PmDashboardService {
    pmUrl: string = this._global.baseURL + '/api/dashboard';

    constructor(private _global: GlobalState, private http: Http) { }

    getProjectActivity(pId: string): Promise<any> {
        return this.http.get(`${this.pmUrl}/${pId}/activity`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError);
    }

    getProjectDemand(pId: string): Promise<any> {
        return this.http.get(`${this.pmUrl}/${pId}/demand`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError);
    }

    getProjectTestResult(pId: string): Promise<any> {
        return this.http.get(`${this.pmUrl}/${pId}/testResult`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError);
    }
}
