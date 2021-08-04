import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const baseUrl: string = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: string = 'orders';

  constructor(private _http: HttpClient) {}

  //* Add to order
  postDataToOrders(order) {
    return this._http.post(this.url(this.orders), order);
  }

  //* Get all orders
  getOrders() {
    return this._http.get(this.url(this.orders));
  }

  //* Deleted order
  deleteOrder(data) {
    return this._http.delete(this.url(this.orders) + '/' + data.id, data);
  }

  url(urllink) {
    return `${baseUrl}${urllink}`;
  }
}
