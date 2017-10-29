import { Http } from "@angular/http";

export abstract class ServiceBase {
    protected readonly apiUrl : string;

    protected constructor(protected readonly http: Http, baseUrl: string) {
        this.apiUrl = baseUrl + "api/" + this.controllerName;
    }

    abstract get controllerName(): string;

    protected handleError(error: any): Promise<any> {
        console.error("An error occurred", error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}