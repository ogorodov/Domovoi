import { IInvoice } from "./invoice"
import { IServicePrice } from "./servicePrice"

export interface IInvoiceItem {
    invoice: IInvoice;
    servicePrice: IServicePrice;
    quantity: number;
}