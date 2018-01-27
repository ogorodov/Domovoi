import { DtoBase } from "./dto-base"
import { Invoice } from "./invoice"
import { ServicePrice } from "./service-price"

export interface InvoiceItem extends DtoBase {
  invoice: Invoice;
  servicePrice: ServicePrice;
  quantity: number;
}
