import { IDtoBase } from "./IDtoBase"
import { IInvoice } from "./IInvoice"
import { IServicePrice } from "./IServicePrice"

export interface IInvoiceItem extends IDtoBase {
    invoice: IInvoice;
    servicePrice: IServicePrice;
    quantity: number;
}