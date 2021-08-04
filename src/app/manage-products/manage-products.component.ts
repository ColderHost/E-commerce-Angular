import { ProductService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent implements OnInit {
  dataSource = null;
  bool: boolean = false;

  constructor(private _productS: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    return this._productS.getAll().subscribe((data) => {
      this.dataSource = data;
    });
  }

  displayNewData(data) {
    let alert = document.querySelector<HTMLElement>('.alertBox');

    if (data.length === 0) {
      alert.style.opacity = '1';
      alert.style.display = 'flex';
      new Promise(() => {
        setTimeout(() => {
          if ((alert.style.opacity = '1')) {
            alert.style.display = 'none';
            alert.style.opacity = '0';
          }
        }, 800);
      });
    }
    return (this.dataSource = data);
  }
}
