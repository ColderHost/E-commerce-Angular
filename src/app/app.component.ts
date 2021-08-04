import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  count = 0;
  dataFromSelected: any = 0;

  constructor(private _productS: ProductService) {}

  ngOnInit() {
    this.requestData();
    this.countReturn();
  }

  requestData() {
    this._productS.getDataFromSelected().subscribe((data) => {
      this.dataFromSelected = data;
    });
  }

  countReturn() {
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.requestData());
      }, 300);
    });

    promise.then(() => {
      this.count = this.dataFromSelected.length;
    });

    promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.requestData());
      }, 500);
    });

    promise.then(() => {
      this.count = this.dataFromSelected.length;
    });
  }
}
