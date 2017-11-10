import { Injectable } from "@angular/core";
import { GlobalState } from "../../../global.state";
import { Http } from "@angular/http";

@Injectable()
export class DashboardService {
    getUserListUrl: string = this._global.baseURL + '/api/userlist';
    projectUrl: string = this._global.baseURL + '/api/project';

    constructor(private _global: GlobalState, private http: Http) { }

    getUserlist(): Promise<any> {
        return this.http.get(`${this.getUserListUrl}`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError)
    }

    getProjectDetail(id: string): Promise<any> {
        return this.http.get(`${this.projectUrl}/${id}`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError)
    }

    putProjectDetail(id: string, data: any[]): Promise<any[]> {
        let body = JSON.stringify({ data });
        return this.http.put(`${this.projectUrl}/${id}`, body, this._global.options)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError)
    }

    getProjectUser(id: string): Promise<any> {
        return this.http.get(`${this.projectUrl}/${id}/user`)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError)
    }

    putProjectUser(id: string, data: any[]): Promise<any[]> {
        let body = JSON.stringify({ data });
        return this.http.put(`${this.projectUrl}/${id}/user`, body, this._global.options)
            .toPromise()
            .then(this._global.extractData)
            .catch(this._global.handleError)
    }
}
