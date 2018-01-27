import { Component, OnInit } from "@angular/core";

import { Consumer } from "../../dto/consumer"
import { ConsumerService } from "../../services/consumer.service";

@Component({
  selector: "app-consumer-list",
  templateUrl: "./consumer-list.component.html",
  styleUrls: ["./consumer-list.component.css"]
})
export class ConsumerListComponent implements OnInit {
  consumers: Consumer[];

  constructor(private readonly consumerService: ConsumerService) {}

  ngOnInit() {
    this.consumerService.getAll().then(consumers => this.consumers = consumers);
  }

}
