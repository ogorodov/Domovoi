import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import {ServiceBase} from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { IConsumer } from "../models/consumer";

@Injectable()
export class ConsumerService extends ServiceBase {
    get controllerName() { return "Consumer" }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getAll(): Promise<IConsumer[]> {
        console.info(this.apiUrl);

        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as IConsumer[])
            .catch(this.handleError);
    }
}

//@Injectable()
//export class ConsumerService {
//    constructor(private readonly http: Http, @Inject("BASE_URL") private readonly baseUrl: string) { }

//    getAll(): Promise<IConsumer[]> {
//        return this.http.get(this.baseUrl + "api/Consumer")
//            .toPromise()
//            .then(response => response.json() as IConsumer[])
//            .catch(this.handleError);
//    }

//    private handleError(error: any): Promise<any> {
//        console.error("An error occurred", error); // for demo purposes only
//        return Promise.reject(error.message || error);
//    }
//}