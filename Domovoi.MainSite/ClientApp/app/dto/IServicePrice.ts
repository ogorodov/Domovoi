import { IDtoBase } from "./IDtoBase"
import { IService } from "./IService"

export interface IServicePrice extends IDtoBase {
    id: number;
    service: IService;
    startDate: Date;
    endDate: Date;
    price: number;
}