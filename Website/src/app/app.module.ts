import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'

/* Localization */
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru"
registerLocaleData(localeRu);

/* Angular Date Time Picker https://www.npmjs.com/package/ng-pick-datetime */
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";

/* Services */
import { ConsumerService } from "./services/consumer.service";
import { InvoiceService } from "./services/invoice.service";
import { PaymentService } from "./services/payment.service";
import { ServiceService } from "./services/service.service";

/* Components */
import { AppComponent } from "./components/app/app.component";
import { AppRoutingModule } from ".//app-routing.module";
import { NavMenuComponent } from "./components/nav-menu/nav-menu.component";
import { ServiceListComponent } from "./components/service-list/service-list.component";
import { HomeComponent } from "./components/home/home.component";
import { ConsumerListComponent } from "./components/consumer-list/consumer-list.component";
import { PaymentListComponent } from "./components/payment-list/payment-list.component";
import { InvoiceListComponent } from "./components/invoice-list/invoice-list.component";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ServiceListComponent,
    HomeComponent,
    ConsumerListComponent,
    PaymentListComponent,
    InvoiceListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,

    /* Angular Date Time Picker https://www.npmjs.com/package/ng-pick-datetime */
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },

    ConsumerService,
    InvoiceService,
    ServiceService,
    PaymentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
