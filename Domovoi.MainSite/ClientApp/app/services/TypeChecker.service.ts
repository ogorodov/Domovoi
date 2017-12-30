import { Injectable } from "@angular/core";
import { IDtoBase } from "../dto/IDtoBase";
import { IInvoice } from "../dto/IInvoice";

@Injectable()
export class TypeCheckerService {
    isInvoice(obj: IDtoBase): obj is IInvoice {
        return obj.$type.startsWith("Domovoi.DAL.Models.Invoice");
    }
}