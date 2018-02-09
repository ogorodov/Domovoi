import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ServiceBase } from "./service-base";
import { Payment } from "../dto/payment"
import { Payment as PaymentModel } from "../models/payment"

@Injectable()
export class PaymentService extends ServiceBase<Payment> {
  get controllerName() { return "Payment" }

  constructor(http: Http) {
    super(http);
  }

  post(model: PaymentModel): Promise<any> {
    return this.http.post(`${this.baseApiUrl}consumer/${model.consumerId}/${this.controllerName}/add`, model)
      .toPromise();
  }
}
