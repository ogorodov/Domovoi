import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";
import { MomentModule} from "angular2-moment";

import { ConsumerService } from "./services/consumer.service"
import { ServicesService } from "./services/services.service"
import { InvoicesService } from "./services/invoices.service"

import { AppComponent } from "./components/app/app.component";
import { NavMenuComponent } from "./components/navmenu/navmenu.component";
import { HomeComponent } from "./components/home/home.component";
import { CounterComponent } from "./components/counter/counter.component";
import { ServicesComponent } from "./components/services/services.component";
import { ConsumersComponent } from "./components/consumers/consumers.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        HomeComponent,
        ServicesComponent,
        ConsumersComponent,
        InvoicesComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        MomentModule,

        // Маршрутизация
        RouterModule.forRoot([
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", component: HomeComponent },
            { path: "counter", component: CounterComponent },
            { path: "services", component: ServicesComponent },
            { path: "consumers", component: ConsumersComponent },
            { path: "invoices/:id", component: InvoicesComponent },
            { path: "**", redirectTo: "home" }
        ])
    ],
    providers: [
        ConsumerService,
        ServicesService,
        InvoicesService
    ]
})
export class AppModuleShared {
}