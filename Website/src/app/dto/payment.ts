import { DtoBase } from "./dto-base"
import { Consumer } from "./consumer"

export interface Payment extends DtoBase {
  id: number;
  consumer: Consumer;
  dateTime: Date;
  amount: number;
}
