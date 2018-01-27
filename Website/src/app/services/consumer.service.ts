import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ServiceBase } from "./service-base";
import { Consumer } from "../dto/consumer"

@Injectable()
export class ConsumerService extends ServiceBase<Consumer> {
  get controllerName() { return "Consumer" }

  constructor(http: Http) {
    super(http);
  }

  getById(id: number | string): Promise<Consumer> {
    return this.http.get(`${this.controllerUrl}${id}`).toPromise()
      .then(response => response.json() as Consumer)
      .catch(this.handleError);
  }

  calculate(id: number | string): Promise<void> {
    return this.http.get(`${this.controllerUrl}${id}/Calculate`).toPromise()
      .catch(this.handleError);

  }
}
