import { Component, OnInit } from "@angular/core";
import { ServiceService } from "../../services/service.service"
import { Service } from "../../dto/service"

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {
	services: Service[];

  constructor(private readonly apiService: ServiceService) {}

  ngOnInit(): void {
    this.apiService.getAll().then(data => this.services = data);
  }

}
