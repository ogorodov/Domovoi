import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServiceBase } from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { IService } from "../dto/IService";

@Injectable()
export class ServicesService extends ServiceBase {
    get controllerName() { return "Services" }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getAll(): Promise<IService[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as IService[])
            .catch(this.handleError);
    }
}