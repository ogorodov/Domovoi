import {IService} from "./service"

export interface IServicePrice {
    id: number;
    service: IService;
    startDate: Date;
    endDate: Date;
    price: number;
}