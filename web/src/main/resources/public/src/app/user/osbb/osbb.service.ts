import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

import {IOsbb} from "../../../shared/models/osbb";
import ApiService = require("../../../shared/services/api.service");

@Injectable()
export class OsbbService { 

    private deleteUrl:string = ApiService.serverUrl + '/restful/osbb/id/';
    private postUrl:string = ApiService.serverUrl + '/restful/osbb';
    private putUrl:string = ApiService.serverUrl + '/restful/osbb';
    private getUrl:string = ApiService.serverUrl + '/restful/osbb';

    constructor(private http: Http) { 
    }

    getAllOsbb(): Promise<IOsbb[]> {
        return this.http.get(this.getUrl)
                 .toPromise()
                 .then(res => res.json())
                 .catch(this.handleError);
    }
    
    getAllOsbbByNameContaining(osbbName: string ):Promise<IOsbb[]> {
        let url = this.getUrl + '/name/' + osbbName;
        return this.http.get(url)
                 .toPromise()
                 .then(res => res.json())
                 .catch(this.handleError);
    }

    getAllOsbbByOrder(field: string, order: boolean) {
        let url = this.getUrl + '/order/' + field + ',' + order;
        return this.http.get(url)
                 .toPromise()
                 .then(res => res.json())
                 .catch(this.handleError);
    }

    getOsbbById(osbbId: number): Promise<IOsbb> {
         let url = this.getUrl + "/id/" + osbbId;
         return this.http.get(url)
                 .toPromise()
                 .then(res => res.json())
                 .catch(this.handleError);
    }

    addOsbb(osbb:IOsbb): Promise<IOsbb> {
        return this.http.post(this.postUrl, JSON.stringify(osbb))
                        .toPromise()
                        .then(res => res.json())
                        .catch(this.handleError);
    }

    editOsbb(osbb:IOsbb):Promise<IOsbb>  {
        return this.http.put(this.putUrl, JSON.stringify(osbb))
                        .toPromise()
                        .then(res => res.json())
                        .catch(this.handleError);
    }

    deleteOsbb(osbb:IOsbb): Promise<IOsbb> {
        let url = ` ${this.deleteUrl}/${osbb.osbbId}`;
        return this.http.delete(url)
                    .toPromise()
                    .then(res => osbb)
                    .catch(this.handleError);
    }

    private handleError(error: any):Promise<any> {
        console.log('HandleError', error);
        return Promise.reject(error.message || error);
    }
}