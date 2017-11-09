import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServiceBase } from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { IInvoice } from "../models/invoice";

@Injectable()
export class InvoicesService extends ServiceBase {
    get controllerName(): string { return "Invoice"; }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getForConsumer(consumerId: string | number): Promise<IInvoice[]> {
        return this.http.get(`api/consumer/${consumerId}/invoice`)
            .toPromise()
            .then(response => response.json() as IInvoice[])
            .catch(this.handleError);
    }
}