import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../../models/Product";
import {FormControl} from "@angular/forms";
import {CartService} from "../cart.service";

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart.row.component.html',
  styleUrls: ['./cart.row.component.scss']
})
export class CartRowComponent implements OnInit {
  @Input() product: Product;
  quantityControl = new FormControl();
  @Output() detectChanges = new EventEmitter();
  @Output() deleteItem = new EventEmitter();

  originalPrice: number;

  configuration = {
    max: this.cartService.configuration.max,
    min: this.cartService.configuration.min
  }

  constructor(private cartService: CartService) {
  }

  increase(product) {
    this.cartService.increase(product, this.quantityControl);
    this.product.price = this.originalPrice * this.quantityControl.value;
    this.detectChanges.emit();
  }

  decrease(product) {
    this.cartService.decrease(product, this.quantityControl);
    this.product.price = this.originalPrice * this.quantityControl.value;
    this.detectChanges.emit();
  }

  ngOnInit() {
    this.originalPrice = this.product.price / this.product.quantity;
    this.quantityControl.setValue(this.product.quantity);
  }

  removeItem(product: Product) {
    this.deleteItem.emit(product);
  }
}
