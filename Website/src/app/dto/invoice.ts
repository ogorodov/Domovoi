import { DtoBase } from "./dto-base"
import { InvoiceItem } from "./invoice-item"

export interface Invoice extends DtoBase {
  id: number;
  date: Date;
  items: InvoiceItem[];
}
