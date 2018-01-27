import { DtoBase } from "./dto-base"
import { ServicePrice } from "./service-price"

export interface Service extends DtoBase {
  id: number;
  name: string;
  prices: ServicePrice[];
}
