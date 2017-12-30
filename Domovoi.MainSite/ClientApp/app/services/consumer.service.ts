import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import {ServiceBase} from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { IConsumer } from "../dto/IConsumer";

@Injectable()
export class ConsumerService extends ServiceBase {
    get controllerName() { return "Consumer" }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getAll(): Promise<IConsumer[]> {
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as IConsumer[])
            .catch(this.handleError);
    }

    getById(id: number | string): Promise<IConsumer> {
        return this.http.get(`${this.apiUrl}/${id}`).toPromise()
            .then(response => response.json() as IConsumer)
            .catch(this.handleError);
    }

    calculate(id: number | string): Promise<void> {
        return this.http.get(`${this.apiUrl}/${id}/Calculate`).toPromise()
            .catch(this.handleError);
    }
}