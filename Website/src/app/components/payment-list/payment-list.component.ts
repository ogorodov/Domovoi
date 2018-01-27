import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { Payment } from "../../dto/payment"
import { Payment as PaymentModel } from "../../models/payment"
import { PaymentService } from "../../services/payment.service";

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
  private readonly pageSize: number = 12;
  private consumerId: number;

  activePage: number = 1;
  pages: number[];
  model: PaymentModel;

  payments: Array<Payment>;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly paymentsService: PaymentService) {
    this.model = new PaymentModel(new Date(), 0);
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    if (!id)
      throw new Error("Identifier is null");
    this.consumerId = parseInt(id);
    this.loadEntities();
  }

  private loadEntities(): void {
    this.paymentsService.getForConsumer(this.consumerId, this.pageSize, this.activePage)
      .then(payments => this.payments = payments);

    this.paymentsService.getForConsumerObjectsCount(this.consumerId)
      .then(paymentsCount => {
        const pagesCount = Math.floor(paymentsCount / this.pageSize);
        this.pages = new Array<number>(pagesCount);
        for (let i = 0; i < pagesCount; i++)
          this.pages[i] = i + 1;
      });
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
