import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

import { Service } from "../dto/service"
import { ServiceBase } from "./service-base"

@Injectable()
export class ServiceService extends ServiceBase<Service> {
  get controllerName() { return "Service" }

  constructor(http: Http) {
    super(http);
  }
}
