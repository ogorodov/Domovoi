import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServiceBase } from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { IDtoBase } from "../dto/IDtoBase";
import { IInvoice } from "../dto/IInvoice";

@Injectable()
export class InvoicesService extends ServiceBase {
    get controllerName(): string { return "Invoice"; }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getForConsumer(consumerId: string | number, pageSize: number, page: number): Promise<IInvoice[]> {
        return this.http.get(`api/consumer/${consumerId}/invoice/${pageSize}/${page}`)
            .toPromise()
            .then(response => {
                var invoices = response.json() as IInvoice[];
                this.restoreReferencesforArray(invoices, new Map<number, IDtoBase>());
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

    restoreReferencesforArray(array: Array<IDtoBase>, map: Map<number, IDtoBase>): void {
        for (const item of array)
            if (Object.prototype.toString.apply(item) === "[object Object]")
                this.restoreReferencesforObject(item, map);
    }

    restoreReferencesforObject(obj: IDtoBase, map: Map<number, IDtoBase>): void {
        for (const [key, value] of Object.entries(obj)) {
            if (key === "$id") {
                map.set(value, obj);
            } else {
                switch (Object.prototype.toString.apply(value)) {
                    case "[object Object]":
                    {
                        if (value.$id) {
                            this.restoreReferencesforObject(value, map);
                        } else if (value.$ref) {
                            this.setPropertyValue(obj, key, map.get(value.$ref));
                        }
                        break;
                    }
                    case "[object Array]":
                    {
                        this.restoreReferencesforArray(value, map);
                        break;
                    }
                }
            }
        }
    }

    private getPropertyValue<T, TK extends keyof T>(obj: T, key: TK) {
        return obj[key];
    }

    private setPropertyValue(obj: any, key: string, newValue: any) {
        obj[key] = newValue;
    }
}