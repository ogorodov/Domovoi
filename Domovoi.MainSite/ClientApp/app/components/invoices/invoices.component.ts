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
    isCalculating: Boolean;
    activePage: number = 1;
    pages: number[];

    private readonly pageSize: number = 12;

    constructor(private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly consumerService: ConsumerService,
        private readonly invoicesService: InvoicesService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");

        if (!id)
            throw new Error("Identifier is null");

        this.consumerService.getById(id)
            .then(consumer => {
                this.consumer = consumer;
                this.loadInvoices();
            });
    }

    calculate(): void {
        this.isCalculating = true;
        this.consumerService.calculate(this.consumer.id)
            .then(() => {
                this.isCalculating = false;
                this.loadInvoices();
            });
    }

    goToPage(page: number): void {
        this.activePage = page;
        this.loadInvoices();
    }

    private loadInvoices(): void {
        this.invoicesService.getForConsumer(this.consumer.id, this.pageSize, this.activePage)
            .then(invoices => this.invoices = invoices);

        this.invoicesService.consumerInvoiceCount(this.consumer.id)
            .then(invoiceCount => {
                const pagesCount = Math.floor(invoiceCount / this.pageSize);
                this.pages = new Array<number>(pagesCount);
                for (let i = 0; i < pagesCount; i++)
                    this.pages[i] = i + 1;
            });
    }
}