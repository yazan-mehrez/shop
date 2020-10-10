import {Component, OnInit} from '@angular/core';
import {CartService} from "./cart.service";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  allProductsInformation: Product[];
  totalPrice: number;

  constructor(private cartService: CartService) {
  }


  ngOnInit(): void {
    this.allProductsInformation = this.cartService.getAllProducts();
    this.reCalculate();
  }

  reCalculate() {
    this.cartService.updateList(this.allProductsInformation);
    this.cartService.calculateTotal();
    this.totalPrice = this.cartService.calculateTotal().total;
    this.cartService.$detectCartChanges.next(true);
  }

  deleteItem(product: Product) {
    this.cartService.removeItem(product, this.allProductsInformation);
    this.reCalculate();
  }
}