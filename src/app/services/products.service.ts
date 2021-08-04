import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl: string = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: string = 'products';
  selected: string = 'selected';

  constructor(private _http: HttpClient) {}

  //
  //
  //
  // * All Products
  //
  //
  //

  //* Return all products
  getAll() {
    return this._http.get(this.returnFunc(this.products));
  }

  //* Delete from all products
  deleteFromAllProducts(data) {
    return this._http.delete(
      this.returnFunc(this.products) + '/' + data.id,
      data
    );
  }

  //* Send to all products
  postToAllProducts(data) {
    return this._http.post(this.returnFunc(this.products), data);
  }

  //* update all products
  updateAllProducts(data) {
    return this._http.put(this.returnFunc(this.products) + '/' + data.id, data);
  }

  //
  //
  //
  //
  // * Selected
  //
  //
  //
  //
  //* Send data to selected
  PostToSelected(data) {
    return this._http.post(this.returnFunc(this.selected), data);
  }

  //*Update data into selected
  updateSelected(data) {
    return this._http.put(this.returnFunc(this.selected) + '/' + data.id, data);
  }

  //* Delete data in selected
  deleteFromSelected(data) {
    return this._http.delete(
      this.returnFunc(this.selected) + '/' + data.id,
      data
    );
  }

  //* Recieve data from selected
  getDataFromSelected() {
    return this._http.get(this.returnFunc(this.selected));
  }

  //* return url
  returnFunc(url) {
    return `${baseUrl}${url}`;
  }
}
