import { Component, OnInit } from "@angular/core";
import { ServicesService } from "../../services/services.service"
import { IService } from "../../models/service"

@Component({
    selector: "services",
    templateUrl: "./services.component.html"
})
export class ServicesComponent implements OnInit {
    services: IService[];

    constructor(private readonly apiService: ServicesService) {}

    ngOnInit(): void {
        this.apiService.getAll().then(data => this.services = data);
    }
}