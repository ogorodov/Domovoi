import { IDtoBase } from "./IDtoBase"
import { IInvoiceItem } from "./IInvoiceItem"

export interface IInvoice extends IDtoBase {
    id: number;
    date: Date;
    items: IInvoiceItem[];
}