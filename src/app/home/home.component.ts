import { AppComponent } from './../app.component';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allProducts: any = null;
  filtered: any = null;
  selectedProducts: any = null;

  constructor(private _productS: ProductService, private _AppC: AppComponent) {}

  //* ngOnInit LifeCycle Hooks
  ngOnInit() {
    this.loadProducts();
    this.loadDataFromSelected();
  }

  //* Return all products
  loadProducts() {
    return this._productS
      .getAll()
      .subscribe(
        (products) => (
          (this.filtered = products), (this.allProducts = products)
        )
      );
  }

  //* Return selected data
  loadDataFromSelected() {
    return this._productS
      .getDataFromSelected()
      .subscribe((selected) => (this.selectedProducts = selected));
  }

  //* Send selected Data to Selected
  PostSelected(selected) {
    this._productS.PostToSelected(selected).subscribe();
  }

  //* Update selected Data in Selected
  updateSelected(selected) {
    return this._productS.updateSelected(selected).subscribe();
  }

  //* Filter data by category
  filterProducts(category: string) {
    if (category === 'All') {
      this.filtered = this.allProducts;
    } else {
      return (this.filtered = this.allProducts.filter((object) => {
        return object['category'] === category;
      }));
    }
  }

  //* Control Choosen Products
  AddToCard(id: string) {
    //* Return object with individual "id"
    let selected = this.allProducts.find((object) => {
      return object['id'] === id;
    });

    //* Declares for Put and Post methods
    let selectedProductsArray = [];
    let sArray = [];
    sArray.push(selected.id);

    this._AppC.countReturn();

    //* Cycle to check if value exist in SelectedDB (Return boolean)
    let cycle = () => {
      let Sboolean: boolean;
      this.loadDataFromSelected();
      this.displayPopUp();
      this.loadDataFromSelected();

      for (let i of this.selectedProducts) {
        selectedProductsArray.push(i.id);
        Sboolean = selectedProductsArray.includes(this.ForLoop(sArray));
      }
      return Sboolean;
    };

    let BooleanValue = cycle();

    //* Invoking Function Post
    if (BooleanValue) {
      this.updateSelected(selected);
    } else {
      this.PostSelected(selected);
    }
  }

  //* For adding product to SelectDB
  ForLoop(array) {
    let index: number;
    for (let i of array) {
      index = i;
    }
    return index;
  }

  //* Increase count of product
  IncreaseButton(id) {
    return this.allProducts[id - 1].count++;
  }

  //* Decrease count of product
  DecreaseButton(id) {
    if (this.allProducts[id - 1].count > 1) {
      return this.allProducts[id - 1].count--;
    }
    return 0;
  }

  //* Assign input value to allProducts.count
  countInput(event: any, id) {
    try {
      return (this.allProducts[id - 1].count = event.target.value);
    } catch (err) {
      return err;
    }
  }

  displayPopUp() {
    new Promise(() => {
      setTimeout(() => {
        if ((popUp.style.display = 'flex')) {
          popUp.style.opacity = '0';
        }
      }, 800);
    });

    let popUp = document.querySelector<HTMLElement>('.popUpMessage');
    popUp.style.opacity = '1';
  }
}
