import { IDtoBase } from "./IDtoBase"

export interface IConsumer extends IDtoBase {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
}