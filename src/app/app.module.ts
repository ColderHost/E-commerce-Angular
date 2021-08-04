import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module.module';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './services/products.service';
import { OrderComponent } from './order/order.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderService } from './services/order.service';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SearchBarComponent } from './manage-products/search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { ButtonActionsComponent } from './manage-products/button-actions/button-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    CheckOutComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    SearchBarComponent,
    ButtonActionsComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    FontAwesomeModule,
  ],

  providers: [ProductService, OrderService],

  bootstrap: [AppComponent],
})
export class AppModule {}
