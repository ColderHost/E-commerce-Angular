import { ProductService } from './../../services/products.service';
import { ManageProductsComponent } from './../manage-products.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [NgbModalConfig, NgbModal],
})
export class SearchBarComponent implements OnInit {
  @Input() dataSource;
  @Output() filteredObj = new EventEmitter();

  productForm: FormGroup;

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _manageProd: ManageProductsComponent,
    private fB: FormBuilder,
    private _prodS: ProductService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;

    this.productForm = this.fB.group({
      id: '',
      title: '',
      imageUrl: '',
      price: '',
      category: '',
      count: '1',
    });
  }

  ngOnInit() {}

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  //* Search field
  findOut(char) {
    if (char !== '') {
      let filteredObjects = this.dataSource.filter((element) => {
        let filtered = element['title']
          .toLowerCase()
          .includes(char.toLowerCase());

        if (filtered) {
          return filtered;
        } else return 0;
      });

      return this.filteredObj.emit(filteredObjects);
    } else if (char == '') {
      return this._manageProd.getProducts();
    }
  }

  //* Add new product form
  onSubmit() {
    this.productForm.value.count = 1;
    return this._prodS
      .postToAllProducts(this.productForm.value)
      .subscribe(() => {
        this._manageProd.getProducts();
        this.productForm.reset();
      });
  }

  cancel() {
    this.productForm.reset();
  }
}
