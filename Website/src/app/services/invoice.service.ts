import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { ServiceBase } from "./service-base";
import { Invoice } from "../dto/invoice";

@Injectable()
export class InvoiceService extends ServiceBase<Invoice> {
  get controllerName() { return "Invoice" }

  constructor(http: Http) {
    super(http);
  }
}
