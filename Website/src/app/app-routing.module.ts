import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router"

import { HomeComponent } from "./components/home/home.component"
import { ConsumerListComponent } from "./components/consumer-list/consumer-list.component"
import { InvoiceListComponent } from "./components/invoice-list/invoice-list.component"
import { PaymentListComponent } from "./components/payment-list/payment-list.component"
import { ServiceListComponent } from "./components/service-list/service-list.component"

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot([
      { path: "home", component: HomeComponent },
      { path: "consumers", component: ConsumerListComponent },
      { path: "invoices/:id", component: InvoiceListComponent },
      { path: "payments/:id", component: PaymentListComponent },
      { path: "services", component: ServiceListComponent },
      { path: "", redirectTo: "/home", pathMatch: "full" }
    ])
  ],
})
export class AppRoutingModule {
}
