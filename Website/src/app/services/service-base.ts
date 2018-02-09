import { isDevMode } from "@angular/core";
import { Http } from "@angular/http";

import { DtoBase } from "../dto/dto-base";

export abstract class ServiceBase<T extends DtoBase> {
  protected readonly baseApiUrl: string;
  protected readonly controllerUrl: string;

  protected constructor(protected readonly http: Http) {
    this.baseApiUrl = (isDevMode() ? "http://localhost:54518/" : "/") + "api/";
    this.controllerUrl = this.baseApiUrl + this.controllerName + "/";
  }

  abstract get controllerName(): string;

  getAll(): Promise<T[]> {
    return this.http.get(this.controllerUrl)
      .toPromise()
      .then(response => response.json() as T[])
      .catch(this.handleError);
  }

  getForConsumer(consumerId: string | number, pageSize: number, page: number): Promise<T[]> {
    return this.http.get(`${this.baseApiUrl}consumer/${consumerId}/${this.controllerName}/${pageSize}/${page}`)
      .toPromise()
      .then(response => {
        const objects = response.json() as T[];
        this.restoreReferencesforArray(objects, new Map<number, DtoBase>());
        return objects;
      })
      .catch(this.handleError);
  }

  getForConsumerObjectsCount(consumerId: string | number): Promise<number> {
    return this.http.get(`${this.baseApiUrl}consumer/${consumerId}/${this.controllerName}/Count`)
      .toPromise()
      .then(response => parseInt(response.text()))
      .catch(this.handleError);
  }

  protected handleError(error: any): Promise<any> {
    console.error("An error occurred", error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  protected restoreReferencesforArray(array: Array<DtoBase>, map: Map<number, DtoBase>): void {
    for (const item of array)
      if (Object.prototype.toString.apply(item) === "[object Object]")
        this.restoreReferencesforObject(item, map);
  }

  protected restoreReferencesforObject(obj: DtoBase, map: Map<number, DtoBase>): void {
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

  private getPropertyValue<TO, TK extends keyof TO>(obj: TO, key: TK) {
    return obj[key];
  }

  private setPropertyValue(obj: any, key: string, newValue: any) {
    obj[key] = newValue;
  }
}
