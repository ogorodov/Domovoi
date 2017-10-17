import { Component, Inject } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector: "services",
    templateUrl: "./services.component.html"
})
export class ServicesComponent {
    services: IService[];

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        http.get(baseUrl + "api/Services").subscribe(result => {
                this.services = result.json() as IService[];
            },
            error => console.error(error));
    }
}

interface IService {
    id: number;
    name: string;
    prices: IServicePrice[];
}

interface IServicePrice {
    id: number;
    service: IService;
    startDate: Date;
    endDate: Date;
}