import { OrderService } from './../services/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
})
export class ManageOrdersComponent implements OnInit {
  dataSource = null;

  constructor(private _ordersS: OrderService) {}

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    return this._ordersS.getOrders().subscribe((data) => {
      this.dataSource = data;
    });
  }

  removeOrder(data) {
    return this._ordersS.deleteOrder(data).subscribe(() => {
      return this.getOrders();
    });
  }
}
