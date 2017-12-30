import { IDtoBase } from "./IDtoBase"
import { IServicePrice } from "./IServicePrice"

export interface IService extends IDtoBase {
    id: number;
    name: string;
    prices: IServicePrice[];
}