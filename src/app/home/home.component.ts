import {Component, OnInit} from '@angular/core';
import {Currency, Product, Unit} from "../../models/Product";
import {AddToCart} from "../../models/AddToCart";
import {CartService} from "../cart/cart.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listOfProducts: Product[] = [
    {
      id: 1,
      name: 'Potato',
      unit: Unit.KG,
      description: 'Potato, Solanum tuberosum, is an herbaceous perennial plant in the family Solanaceae which is grown for its edible tubers.',
      price: 5,
      quantity: 0,
      favorite: false,
      image: 'https://i.pinimg.com/564x/c1/88/37/c1883709905a177b29ba0f400f0b2e22.jpg',
      brand: 'Carrefour',
      currency: Currency.AED,
      entryDate: new Date()
    },
    {
      id: 2,
      name: 'Carrot',
      unit: Unit.KG,
      description: 'Carrot, Solanum tuberosum, is an herbaceous perennial plant in the family Solanaceae which is grown for its edible tubers.',
      price: 7,
      quantity: 0,
      favorite: false,
      image: 'https://i.ndtvimg.com/i/2017-10/carrots_620x330_51507552285.jpg',
      brand: 'West Zone',
      currency: Currency.AED,
      entryDate: new Date()
    },
    {
      id: 3,
      name: 'Onion',
      unit: Unit.KG,
      description: 'Onion, Solanum tuberosum, is an herbaceous perennial plant in the family Solanaceae which is grown for its edible tubers.',
      price: 3,
      quantity: 0,
      favorite: false,
      image: 'https://images-na.ssl-images-amazon.com/images/I/81UeYuulNjL._SX522_.jpg',
      brand: 'Grocery',
      currency: Currency.AED,
      entryDate: new Date()
    }
  ]


  constructor(private  cartService: CartService) {
  }


  addToCart(cart: AddToCart) {
    this.cartService.addToCart(cart.product, cart.total);
  }

  ngOnInit(): void {
  }

}
