import { Injectable, Inject } from "@angular/core"
import { Http } from "@angular/http";
import { ServiceBase } from "./serviceBase"
import { IPayment } from "../dto/IPayment";

@Injectable()
export class PaymentsService extends ServiceBase {
    get controllerName() { return "Payment" }

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        super(http, baseUrl);
    }

    getForConsumer(consumerId: string | number, pageSize: number, page: number): Promise<IPayment[]> {
        return this.http.get(`api/consumer/${consumerId}/payment/${pageSize}/${page}`)
            .toPromise()
            .then(response => response.json() as IPayment[])
            .catch(this.handleError);
    }

    consumerPaymentsCount(consumerId: string | number): Promise<number> {
        return this.http.get(`api/consumer/${consumerId}/paymentsCount`)
            .toPromise()
            .then(response => parseInt(response.text()))
            .catch(this.handleError);
    }
}