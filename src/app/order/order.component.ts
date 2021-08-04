import { AppComponent } from './../app.component';
import { ProductService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { BuiltinTypeName } from '@angular/compiler';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  count: number = 0;
  dataSource = null;
  displayedColumns: string[] = ['imgUrl', 'title', 'count', 'price', 'remove'];
  summary: number = 0;

  constructor(private _ProductS: ProductService, private _AppC: AppComponent) {}

  ngOnInit() {
    this.loadSelected();
    this.countReturn();
    this.checkOutBtnTableDelAllBtn();
  }

  ngAfterViewInit() {
    this.summaryInfo();
  }

  //* Load Selected Group
  loadSelected() {
    this._ProductS.getDataFromSelected().subscribe((data) => {
      return (this.dataSource = data);
    });
  }

  //* Updated
  updateSelected(data) {
    return this._ProductS.updateSelected(data).subscribe();
  }

  //* Deleted all from selected
  deleteAllSelected() {
    for (let product of this.dataSource) {
      this._ProductS.deleteFromSelected(product).subscribe();
      this.loadSelected();
      this.summaryInfo();
      this.countReturn();
      this.checkOutBtnTableDelAllBtn();
      this._AppC.countReturn();
    }
    return this.loadSelected();
  }

  countReturn() {
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loadSelected());
      }, 400);
    });

    promise.then(() => {
      if (this.dataSource.length === 0) {
        return (this.count = 0);
      } else {
        return (this.count = this.dataSource.length);
      }
    });

    promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loadSelected());
      }, 500);
    });

    promise.then(() => {
      if (this.dataSource.length === 0) {
        return (this.count = 0);
      } else {
        return (this.count = this.dataSource.length);
      }
    });
  }

  //* Increase btn
  Increase(id) {
    let selected = this.dataSource.find((object) => {
      return object['id'] === id;
    });

    for (let product of this.dataSource) {
      if (product.id === id) {
        let count = product.count++;
        this.updateSelected(selected);
        this.summaryInfo();
        return count;
      }
    }

    return 0;
  }

  //* Rounded price
  Round(count, price) {
    let number = count * price;
    let rounded = Math.round((number + Number.EPSILON) * 100) / 100;
    return rounded;
  }

  //* Send input's value to selected
  countInput(id, event: any) {
    let selected = this.dataSource.find((object) => {
      return object['id'] === id;
    });

    for (let product of this.dataSource) {
      if (product.id === id) {
        product.count = event.target.value;
        this.summaryInfo();
        this.updateSelected(selected);
        return product.count;
      }
    }
    console.log(id);
    return 0;
  }

  //* Decrease btn
  Decrease(id) {
    let selected = this.dataSource.find((object) => {
      return object['id'] === id;
    });

    for (let product of this.dataSource) {
      if (product.id === id) {
        if (product.count > 1) {
          let count = product.count--;
          this.summaryInfo();
          this.updateSelected(selected);
          return count;
        } else return 0;
      }
    }
    return 0;
  }

  //* Remove element
  removeBtn(id) {
    let selected = this.dataSource.find((object) => {
      return object['id'] === id;
    });

    return this._ProductS.deleteFromSelected(selected).subscribe(() => {
      this.loadSelected();
      this.countReturn();
      this.checkOutBtnTableDelAllBtn();
      this._AppC.countReturn();
      this.summaryInfo();
    });
  }

  summaryInfo(): number {
    let promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loadSelected());
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

  //* Display none without element
  checkOutBtnTableDelAllBtn() {
    let btnCheckOut = document.querySelector<HTMLElement>('.routerBtn');
    let table = document.querySelector<HTMLTableElement>('.tableForm');
    let delAll = document.querySelector<HTMLElement>('.clearButton');

    let promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loadSelected());
      }, 400);
    });

    promise.then(() => {
      if (this.dataSource.length === 0) {
        btnCheckOut.style.display = 'none';
        table.style.display = 'none';
        delAll.style.display = 'none';
      } else {
        btnCheckOut.style.display = 'block';
        table.style.display = 'block';
        delAll.style.display = 'block';
      }
    });
  }
}
