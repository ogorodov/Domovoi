import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { ConsumerService } from "../../services/consumer.service";
import { InvoiceService } from "../../services/invoice.service";
import { Consumer } from "../../dto/consumer";
import { Invoice } from "../../dto/invoice";

@Component({
  selector: "app-invoice-list",
  templateUrl: "./invoice-list.component.html",
  styleUrls: ["./invoice-list.component.css"]
})
export class InvoiceListComponent implements OnInit {
  consumer: Consumer;
  invoices: Invoice[];
  isCalculating: Boolean;
  activePage: number = 1;
  pages: number[];

  private readonly pageSize: number = 12;

  constructor(private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly consumerService: ConsumerService,
    private readonly invoicesService: InvoiceService) {
  }

  ngOnInit() {
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

  calculateInvoiceTotal(invoice: Invoice): number {
    let result: number = 0;
    for (let item of invoice.items)
      result = result + item.quantity * item.servicePrice.price;
    return result;
  }

  private loadInvoices(): void {
    this.invoicesService.getForConsumer(this.consumer.id, this.pageSize, this.activePage)
      .then(invoices => {
        this.invoices = invoices;
      });

    this.invoicesService.getForConsumerObjectsCount(this.consumer.id)
      .then(invoiceCount => {
        const pagesCount = Math.floor(invoiceCount / this.pageSize);
        this.pages = new Array<number>(pagesCount);
        for (let i = 0; i < pagesCount; i++)
          this.pages[i] = i + 1;
      });
    console.info("loadInvoices executed");
  }
}
