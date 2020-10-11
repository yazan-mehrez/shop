import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../models/Product';
import {FormControl} from '@angular/forms';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart.row.component.html',
  styleUrls: ['./cart.row.component.scss']
})
export class CartRowComponent implements OnInit {
  @Input() public product: Product;
  @Output() public detectChanges = new EventEmitter();
  @Output() public deleteItem = new EventEmitter();
  public quantityControl = new FormControl();

  public configuration = {
    max: this.cartService.configuration.max,
    min: this.cartService.configuration.min
  };

  constructor(private cartService: CartService) {
  }

  public increase(product) {
    this.cartService.increase(product, this.quantityControl);
    this.detectChanges.emit();
  }

  public decrease(product) {
    this.cartService.decrease(product, this.quantityControl);
    this.detectChanges.emit();
  }

  ngOnInit() {
    if (this.product) {
      this.quantityControl.setValue(this.product.quantity);
    }
  }

  public removeItem(product: Product) {
    this.deleteItem.emit(product);
  }
}
