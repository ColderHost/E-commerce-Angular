import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from '../app.component';
import { OrderService } from '../services/order.service';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnInit {
  profileForm: FormGroup;
  textIfEmpty: string;
  dataSource: any = 0;
  summary: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private _orderS: OrderService,
    private _ProductS: ProductService,
    private _AppC: AppComponent
  ) {
    this.profileForm = this.formBuilder.group({
      id: ' ',
      firstName: ' ',
      lastName: ' ',
      email: ' ',
      address: ' ',
      comment: ' ',
      orders: [],
    });
  }

  ngOnInit() {
    this.getSelected();
    this.summaryInfo();
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      comment: [''],
    });
  }

  getSelected() {
    return this._ProductS.getDataFromSelected().subscribe((data) => {
      return (this.dataSource = data);
    });
  }

  summaryInfo(): number {
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getSelected());
      }, 500);
    });

    let summary: number[] = [0];

    promise.then(() => {
      for (let prod of this.dataSource) {
        let number: number = prod.count * prod.price;
        let rounded: number = Math.round((number + Number.EPSILON) * 100) / 100;
        summary.push(rounded);
      }

      let rounded;

      rounded = summary
        .reduce((accumulator, curr) => accumulator + curr)
        .toFixed(2);

      this.summary = parseFloat(rounded);
    });

    return this.summary;
  }

  postToOrder(order) {
    return this._orderS.postDataToOrders(order).subscribe(() => {
      this.getSelected();
    });
  }

  removeAllSelected() {
    for (let product of this.dataSource) {
      this._ProductS.deleteFromSelected(product).subscribe();
      this.getSelected();
      this.summary = 0;
      this._AppC.countReturn();
    }
    return this.getSelected();
  }

  onSubmit() {
    let filteredData = this.dataSource;
    filteredData.forEach((vaR) => {
      delete vaR.imageUrl;
      delete vaR.category;
    });

    this.profileForm.value.orders = filteredData;

    if (this.profileForm.value.orders.length > 0) {
      this.postToOrder(this.profileForm.value);
      this.removeAllSelected();
    } else {
      return (this.textIfEmpty = 'Please choose a product!');
    }
    return this.getSelected();
  }
}
