import { Injectable } from "@angular/core";
import { TypeCheckerService} from "./TypeChecker.service"
import { IDtoBase } from "../dto/IDtoBase";

@Injectable()
export class TypeCOnverterService {
    constructor(private readonly typeChecker: TypeCheckerService) {
    }

    convert<T>(dto : IDtoBase) : T {
        if (this.typeChecker.isInvoice(dto))

    }
}