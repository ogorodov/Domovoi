import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { IPayment } from "../../dto/IPayment"
import { Payment } from "../../models/Payment"
import { PaymentsService } from "../../services/payments.service"; 

@Component({
    selector: "payments",
    templateUrl: "./payments.component.html"
})
export class PaymentsComponent implements OnInit {
    private readonly pageSize: number = 12;
    private consumerId: number;

    activePage: number = 1;
    pages: number[];
    model: Payment;

    payments: Array<IPayment>;

    constructor(private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly paymentsService: PaymentsService) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");

        if (!id)
            throw new Error("Identifier is null");
        this.consumerId = parseInt(id);
        this.loadEntities();
    }

    private loadEntities(): void {
        this.paymentsService.getForConsumer(this.consumerId, this.pageSize, this.activePage)
            .then(payments => this.payments = payments);

        this.paymentsService.consumerPaymentsCount(this.consumerId)
            .then(paymentsCount => {
                const pagesCount = Math.floor(paymentsCount / this.pageSize);
                this.pages = new Array<number>(pagesCount);
                for (let i = 0; i < pagesCount; i++)
                    this.pages[i] = i + 1;
            });
    }

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
}