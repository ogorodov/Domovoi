import { Component, Inject } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector: "fetchdata",
    templateUrl: "./fetchdata.component.html"
})
export class FetchDataComponent {
    consumers: IConsumer[];

    constructor(http: Http, @Inject("BASE_URL") baseUrl: string) {
        http.get(baseUrl + "api/Consumer").subscribe(result => {
                this.consumers = result.json() as IConsumer[];
            },
            error => console.error(error));
    }
}

interface IConsumer {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
}