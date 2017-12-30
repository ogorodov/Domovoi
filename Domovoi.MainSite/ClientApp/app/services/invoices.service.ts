import { Injectable } from "@angular/core";
import { Inject } from "@angular/core";
import { Http } from "@angular/http";
import { ServiceBase } from "./serviceBase"
import "rxjs/add/operator/toPromise"
import { IDtoBase } from "../dto/IDtoBase";
import { IInvoice } from "../dto/IInvoice";
import { TypeCheckerService } from "./TypeChecker.service";

@Injectable()
export class InvoicesService extends ServiceBase {
    get controllerName(): string { return "Invoice"; }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string, private readonly typeChecker: TypeCheckerService) {
        super(http, baseUrl);
    }

    getForConsumer(consumerId: string | number, pageSize: number, page: number): Promise<IInvoice[]> {
        return this.http.get(`api/consumer/${consumerId}/invoice/${pageSize}/${page}`)
            .toPromise()
            .then(response => {
                var invoices = response.json() as IInvoice[];

                debugger;

                this.restoreReferencesforArray(invoices, new Map<number, object>());

                //for(const item of invoices)
                //this.restoreReferences(invoices, catalog);

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

    restoreReferencesforArray(array: Array<IDtoBase>, map: Map<number, object>): void {
        for (const item of array)
            if (Object.prototype.toString.apply(item) === "[object Object]")
                this.restoreReferencesforObject(item, map);
    }

    restoreReferencesforObject(obj: IDtoBase, map: Map<number, object>, ): void {
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

    //restoreReferences(obj: any, catalog: IDtoBase[]): void {
    //    debugger;

    //    if (Object.prototype.toString.apply(obj) === "object") {

    //    } else if (Object.prototype.toString.apply(obj) === "[object Array]") {

    //    }

    //    //if (Object.prototype.toString.apply(obj) === "[object Array]") {
    //    //    for (const item of obj) {
    //    //        this.restoreReferences(item, catalog);
    //    //    }
    //    //} else if (obj && typeof obj === "object") {
    //    //    if (key === "$id") {
    //    //        catalog[value] = 
    //    //    }

    //    for (const [key, value] of Object.entries(obj)) {
    //        if (key === "$id") {
    //            catalog[value] = obj;
    //        }
    //        else if (key === "$ref") {
    //            obj[key] = catalog[value];
    //        }
    //        else if (Object.prototype.toString.apply(value) === "[object Array]") {
    //            for (const item of value) {
    //                this.restoreReferences(item, catalog);
    //            }
    //        }
    //    }
    //    //type t1 = keyof IDtoBase;

    //    //const properties = Object.getOwnPropertyNames(obj);

    //    //for (const propertyName of properties) {
    //    //    const value = this.getPropertyValue(obj, propertyName);
    //    //}


    //    //const names = Object.getOwnPropertyNames(obj);
    //    //object.getOwnEnumerableProperties()


    //    //if (Object.prototype.toString.apply(obj) === "[object Array]") {
    //    //    for (const item of obj)
    //    //        this.restoreReferences();
    //    //} else {

    //    //}

    //    //let t1 = Object.prototype.toString.apply(obj);
    //    //let t2 = Object.prototype.toString.apply( (<IDtoBase[]>obj)[0]);


    //    //if (obj instanceof IDtoBase) {

    //    //}

    //    //for (const item of obj) {
    //    //    if (item.$id !== undefined)
    //    //        catalog[item.$id] = item;
    //    //}
    //}

    getPropertyValue<T, TK extends keyof T>(obj: T, key: TK) {
        return obj[key];
    }

    setPropertyValue(obj: any, key: string, newValue: any) {
        obj[key] = newValue;
    }
}