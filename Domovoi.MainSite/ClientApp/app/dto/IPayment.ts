import {IDtoBase} from "./IDtoBase"
import { IConsumer } from "./IConsumer"

export interface IPayment extends IDtoBase {
    id: number;
    consumer: IConsumer;
    dateTime: Date;
    amount: number;
}