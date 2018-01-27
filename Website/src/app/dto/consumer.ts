import { DtoBase } from "./dto-base"

export interface Consumer extends DtoBase {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
}
