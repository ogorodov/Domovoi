import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServiceBase } from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { Invoice } from "../models/invoice";

@Injectable()
export class InvoicesService extends ServiceBase {
    get controllerName(): string { return "Invoice"; }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getForConsumer(consumerId: string | number, pageSize: number, page: number): Promise<Invoice[]> {
        return this.http.get(`api/consumer/${consumerId}/invoice/${pageSize}/${page}`)
            .toPromise()
            .then(response => {
                debugger;
                var invoices = response.json() as Invoice[];
                var i1 = JSON.parse(response.text());
                for (let o of invoices)
                    for (let i of o.items)
                        console.info(`i.servicePrice.id${i.servicePrice.id}`);
                ////for (let i of invoices[0].items)
                ////    console.info("i.servicePrice.id" + i.servicePrice.id);

                //var result = new Array<Invoice>(invoices.length);
                //for (let i = 0; i < result.length; i++) {
                //    var merged = Object.assign(new Invoice, invoices[i]);
                //    result[i] = merged;

                //    //result[i] = o1;
                //    //o1.myTotal();
                //    console.info("mytotal " + merged.myTotal());
                //}
                return invoices;
            })
            .catch(this.handleError);
    }

    consumerInvoiceCount(consumerId: string | number): Promise<number> {
        return this.http.get(`api/consumer/${consumerId}/invoiceCount`)
            .toPromise()
            .then(response => parseInt(response.text()))
            .catch(this.handleError);
    }
}