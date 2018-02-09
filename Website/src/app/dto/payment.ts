import { DtoBase } from "./dto-base"
import { Consumer } from "./consumer"

export interface Payment extends DtoBase {
  id: number;
  consumerId: number;
  consumer: Consumer;
  dateTime: Date;
  amount: number;
}
