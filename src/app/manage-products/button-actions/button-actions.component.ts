import { ManageProductsComponent } from './../manage-products.component';
import { ProductService } from './../../services/products.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-actions',
  templateUrl: './button-actions.component.html',
  styleUrls: ['./button-actions.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class ButtonActionsComponent implements OnInit {
  @Input() product;
  @Input() dataSource;

  productForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    imageUrl: new FormControl(),
    price: new FormControl(),
    category: new FormControl(),
    count: new FormControl(),
  });

  constructor(
    private _prodS: ProductService,
    private _manageProdC: ManageProductsComponent,
    config: NgbModalConfig,

    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.productForm.setValue({
      id: this.product.id,
      title: this.product.title,
      imageUrl: this.product.imageUrl,
      price: this.product.price,
      category: this.product.category,
      count: 1,
    });
  }

  //* Edit window
  openEditWindow(content) {
    this.modalService.open(content, { size: 'md' });
  }

  //* Delete product
  deleteFromAllProducts(data) {
    return this._prodS.deleteFromAllProducts(data).subscribe(() => {
      this._manageProdC.getProducts();
    });
  }

  //* Delete btn
  deleteBtn(id) {
    let selected = this.dataSource.find((object) => {
      return object['id'] === id;
    });
    console.log('First remove comment in deleteBtn in return statement');
    //ToDo: return this.deleteFromAllProducts(selected);
  }

  //* Make updates in /products/id
  onSubmit() {
    return this._prodS
      .updateAllProducts(this.productForm.value)
      .subscribe(() => {
        this._manageProdC.getProducts();
      });
  }
}
