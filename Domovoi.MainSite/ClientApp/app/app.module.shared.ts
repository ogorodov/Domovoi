import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { ConsumerService } from "./services/consumer.service"
import { InvoicesService } from "./services/invoices.service"
import { PaymentsService } from "./services/payments.service"
import { ServicesService } from "./services/services.service"

import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { ConsumersComponent } from "./components/consumers/consumers.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { PaymentsComponent } from "./components/payments/payments.component";
import { ServicesComponent } from "./components/services/services.component";



@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ConsumersComponent,
        InvoicesComponent,
        PaymentsComponent,
        ServicesComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,

        // Маршрутизация
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "services", component: ServicesComponent },
            { path: "consumers", component: ConsumersComponent },
            { path: "invoices/:id", component: InvoicesComponent },
            { path: "payments/:id", component: PaymentsComponent },
            { path: "**", redirectTo: "home" }
        ])
    ],
    providers: [
        ConsumerService,
        InvoicesService,
        PaymentsService,
        ServicesService
    ]
})
export class AppModuleShared {
}