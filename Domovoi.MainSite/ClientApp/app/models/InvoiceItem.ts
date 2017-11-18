import { Invoice } from "./invoice"
import { IServicePrice } from "./servicePrice"

export interface IInvoiceItem {
    //invoice: Invoice;
    servicePrice: IServicePrice;
    quantity: number;
}