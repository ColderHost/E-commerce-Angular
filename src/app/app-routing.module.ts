import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderComponent } from './order/order.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'manage-order', component: ManageOrdersComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
