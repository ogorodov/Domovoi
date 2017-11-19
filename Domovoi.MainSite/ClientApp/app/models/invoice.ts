import { IDtoBase } from "./IDtoBase"
import { IInvoiceItem } from "./invoiceItem"

export interface IInvoice extends IDtoBase {
    id: number;
    date: Date;
    items: IInvoiceItem[];
}

//export class Invoice {
//    id: number;
//    date: Date;
//    items: IInvoiceItem[];

//    //constructor(source: Invoice) {
//    //    this.id = source.id;
//    //    this.date = source.date;
//    //    this.items = source.items;
//    //}

//    //myTotal: number = 1;

//    myTotal(): number {
//        let result: number = 0;

//        for (let item of this.items) {
//            console.info("item.quantity " + item.quantity + " item.servicePrice.price " + item.servicePrice.startDate);
//            result = result + item.quantity * item.servicePrice.price;

//        }
//        return result;
//    }
//}