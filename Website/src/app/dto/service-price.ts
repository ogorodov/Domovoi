import { DtoBase } from "./dto-base"
import { Service } from "./service"

export interface ServicePrice extends DtoBase {
  id: number;
  service: Service;
  startDate: Date;
  endDate: Date;
  price: number;
}
