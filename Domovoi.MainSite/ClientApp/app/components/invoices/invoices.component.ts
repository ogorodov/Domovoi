import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ConsumerService } from "../../services/consumer.service";
import { InvoicesService } from "../../services/invoices.service";
import { IConsumer } from "../../models/consumer";
import { IInvoice } from "../../models/invoice";
import "rxjs/add/operator/switchMap";

@Component({
    selector: "invoices",
    templateUrl: "./invoices.component.html"
})
export class InvoicesComponent implements OnInit {
    consumer: IConsumer;
    invoices: IInvoice[];

    constructor(private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly consumerService: ConsumerService,
        private readonly invoicesService: InvoicesService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");

        if (id) {
            this.consumerService.getById(id)
                .then(consumer => this.consumer = consumer);

            this.invoicesService.getForConsumer(id)
                .then(invoices => this.invoices = invoices);
        } else
            throw new Error("Identifier is null");
    }
}