import {IServicePrice} from "./servicePrice"

export interface IService {
    id: number;
    name: string;
    prices: IServicePrice[];
}