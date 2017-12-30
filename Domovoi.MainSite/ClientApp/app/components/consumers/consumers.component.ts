import {Component, OnInit} from "@angular/core";
import {ConsumerService} from "../../services/consumer.service";
import {IConsumer} from "../../dto/IConsumer";

@Component({
    selector: "consumers",
    templateUrl: "./consumers.component.html"
})
export class ConsumersComponent implements OnInit {
    consumers: IConsumer[];

    constructor(private readonly consumerService: ConsumerService) {}

    ngOnInit(): void {
        this.consumerService.getAll().then(consumers => this.consumers = consumers);
    }
}