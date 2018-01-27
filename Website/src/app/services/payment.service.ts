import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ServiceBase } from "./service-base";
import { Payment } from "../dto/payment"

@Injectable()
export class PaymentService extends ServiceBase<Payment> {
  get controllerName() { return "Payment" }

  constructor(http: Http) {
    super(http);
  }
}
