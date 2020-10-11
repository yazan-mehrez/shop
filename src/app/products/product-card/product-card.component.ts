import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from 'src/models/Product';
import {FormControl} from '@angular/forms';
import {AddToCart} from '../../../models/AddToCart';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() public product: Product;
  @Output() public addedToCart: EventEmitter<AddToCart> = new EventEmitter();

  public added: boolean;
  public quantityControl = new FormControl();
  public total: number;

  public configuration = {
    max: this.cartService.configuration.max,
    min: this.cartService.configuration.min
  };

  constructor(private cartService: CartService) {
  }

  public addToCart() {
    const model = new AddToCart();
    model.product = this.product;
    this.addedToCart.emit(model);
    this.added = true;
    setTimeout(() => {
      this.added = false;
    }, 2000);
  }

  public increase() {
    this.cartService.increase(this.product, this.quantityControl);
  }

  public decrease() {
    this.cartService.decrease(this.product, this.quantityControl);
  }

  ngOnInit(): void {
    if(this.product) {
      this.product.quantity = 1;
    }
    this.quantityControl.setValue(1);
    this.quantityControl.valueChanges.subscribe(value => {
      if (value === '') {
        this.total = this.product.price;
      } else {
        this.total = value * this.product.price;
      }
    });
  }

}
