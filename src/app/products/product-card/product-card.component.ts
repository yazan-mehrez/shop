import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from 'src/models/Product';
import {FormControl} from "@angular/forms";
import {AddToCart} from "../../../models/AddToCart";
import {CartService} from "../../cart/cart.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  @Output() addedToCart: EventEmitter<AddToCart> = new EventEmitter();

  added: boolean;
  quantityControl = new FormControl();
  total: number;

  configuration = {
    max: this.cartService.configuration.max,
    min: this.cartService.configuration.min
  }

  constructor(private cartService: CartService) {
  }

  addToCart() {
    const model = new AddToCart();
    model.product = this.product;
    this.addedToCart.emit(model);
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 2000);
  }

  increase() {
    this.cartService.increase(this.product, this.quantityControl);
  }

  decrease() {
    this.cartService.decrease(this.product, this.quantityControl);
  }

  ngOnInit(): void {
    this.quantityControl.setValue(1);
    this.product.quantity = 1;
    this.quantityControl.valueChanges.subscribe(value => {
      if (value === '') {
        this.total = this.product.price;
      } else {
        this.total = value * this.product.price;
      }
    })
  }

}
