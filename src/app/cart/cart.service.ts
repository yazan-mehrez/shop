import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {BehaviorSubject, Subject} from "rxjs";
import {ProcessType} from 'src/models/ProcessType';
import {AddToCart} from "../../models/AddToCart";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  listOfProducts: Product[] = [];
  totalAmount = 0;
  $itemAddedSubscription: BehaviorSubject<Product> = new BehaviorSubject(null)
  $itemDeletedSubscription: BehaviorSubject<Product> = new BehaviorSubject(null)
  $detectCartChanges = new Subject();

  configuration = {
    max: 100,
    min: 1
  }

  constructor() {
    this.listOfProducts = localStorage.getItem('products') ? (JSON.parse(localStorage.getItem('products')) as Product[]) : [];
  }

  addToCart(product: Product, total: number) {
    if (this.listOfProducts.length === 0) {
      this.listOfProducts.push(product);
      localStorage.setItem('products', JSON.stringify(this.listOfProducts));
      this.cartListener(product, ProcessType.Added);
    } else {
      let isExist = false;
      const listOfProducts: Product[] = JSON.parse(localStorage.getItem('products')) as Product[];
      listOfProducts.forEach(item => {
        if (item.id === product.id) {
          item.price += total;
          item.quantity += product.quantity;
          isExist = true;
        }
      });
      if (!isExist) {
        product.price = product.price * product.quantity;
        listOfProducts.push(product);
      }
      localStorage.setItem('products', JSON.stringify(listOfProducts));
      this.cartListener(product, ProcessType.Added);
    }
  }

  calculateTotal(): AddToCart {
    const listOfProducts: Product[] = JSON.parse(localStorage.getItem('products')) as Product[];
    let total = 0;
    let quantity = 0;
    let result = new AddToCart();
    if (listOfProducts) {
      listOfProducts.forEach(product => {
        total += product.price;
        quantity += product.quantity;
      });
      result.quantity = quantity;
      result.total = total;
      return result;
    }
    return null;
  }

  getAllProducts(): Product[] {
    const listOfProducts: Product[] = JSON.parse(localStorage.getItem('products')) as Product[];
    if (listOfProducts) {
      return listOfProducts;
    }
    return null;
  }

  getTotalPrice(): number {
    let allProducts: Product[] = this.getAllProducts();
    if (allProducts) {
      allProducts.forEach(item => {
        this.totalAmount += item.price;
      })
      return this.totalAmount;
    }
    return 0;
  }

  cartListener(product: Product, processType: ProcessType) {
    if (processType === ProcessType.Added) {
      this.$itemAddedSubscription.next(product);
    } else {
      this.$itemDeletedSubscription.next(product);
    }
  }

  updateList(products: Product[] = null) {
    if (products) {
      localStorage.setItem('products', JSON.stringify(products))
    } else {
      this.getAllProducts();
    }
  }

  removeItem(product: Product, listOfProducts: Product[]) {
    if (listOfProducts) {
      let i = listOfProducts.findIndex(item => item.id === product.id);
      listOfProducts.splice(i, 1);
    } else {
      listOfProducts = JSON.parse(localStorage.getItem('products')) as Product[];
    }
    this.updateList(listOfProducts);
  }

  increase(product: Product, input: FormControl) {
    let quantity = input.value;
    quantity += 1;
    if (quantity <= this.configuration.max) {
      input.setValue(quantity);
      product.quantity = quantity;
    }
  }

  decrease(product: Product, input: FormControl) {
    let quantity = input.value;
    quantity -= 1;
    if (quantity >= this.configuration.min) {
      input.setValue(quantity);
      product.quantity = quantity;
    }
  }
}
