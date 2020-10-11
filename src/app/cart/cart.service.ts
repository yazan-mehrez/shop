import {Injectable} from '@angular/core';
import {Product} from '../../models/Product';
import {BehaviorSubject, Subject} from 'rxjs';
import {ProcessType} from 'src/models/ProcessType';
import {AddToCart} from '../../models/AddToCart';
import {FormControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly listOfProducts: Product[] = [];
  public $itemAddedSubscription: BehaviorSubject<Product> = new BehaviorSubject(null);
  public $itemDeletedSubscription: BehaviorSubject<Product> = new BehaviorSubject(null);
  public $detectCartChanges = new Subject();

  public configuration = {
    max: 100,
    min: 1
  };

  constructor() {
    this.listOfProducts = localStorage.getItem('products') ? (JSON.parse(localStorage.getItem('products')) as Product[]) : [];
  }

  public addToCart(product: Product, total: number) {
    if (this.listOfProducts.length === 0) {
      this.listOfProducts.push(product);
      localStorage.setItem('products', JSON.stringify(this.listOfProducts));
      this.cartListener(product, ProcessType.Added);
    } else {
      let isExist = false;
      const listOfProducts: Product[] = JSON.parse(localStorage.getItem('products')) as Product[];
      listOfProducts.forEach(item => {
        if (item.id === product.id) {
          item.quantity += product.quantity;
          isExist = true;
        }
      });
      if (!isExist) {
        listOfProducts.push(product);
      }
      localStorage.setItem('products', JSON.stringify(listOfProducts));
      this.cartListener(product, ProcessType.Added);
    }
  }

  public calculateTotal(): AddToCart {
    const listOfProducts: Product[] = JSON.parse(localStorage.getItem('products')) as Product[];
    let total = 0;
    let quantity = 0;
    const result = new AddToCart();
    if (listOfProducts) {
      listOfProducts.forEach(product => {
        total += product.price * product.quantity;
        quantity += product.quantity;
      });
      result.quantity = quantity;
      result.total = total;
      return result;
    }
    return null;
  }

  public getAllProducts(): Product[] {
    const listOfProducts: Product[] = JSON.parse(localStorage.getItem('products')) as Product[];
    if (listOfProducts) {
      return listOfProducts;
    }
    return null;
  }

  private cartListener(product: Product, processType: ProcessType) {
    if (processType === ProcessType.Added) {
      this.$itemAddedSubscription.next(product);
    } else {
      this.$itemDeletedSubscription.next(product);
    }
  }

  public updateList(products: Product[] = null) {
    if (products) {
      localStorage.setItem('products', JSON.stringify(products));
    } else {
      this.getAllProducts();
    }
  }

  public removeItem(product: Product, listOfProducts: Product[]) {
    if (listOfProducts) {
      const i = listOfProducts.findIndex(item => item.id === product.id);
      listOfProducts.splice(i, 1);
    } else {
      listOfProducts = JSON.parse(localStorage.getItem('products')) as Product[];
    }
    this.updateList(listOfProducts);
  }

  public increase(product: Product, input: FormControl) {
    let quantity = input.value;
    quantity += 1;
    if (quantity <= this.configuration.max) {
      input.setValue(quantity);
      product.quantity = quantity;
    }
  }

  public decrease(product: Product, input: FormControl) {
    let quantity = input.value;
    quantity -= 1;
    if (quantity >= this.configuration.min) {
      input.setValue(quantity);
      product.quantity = quantity;
    }
  }
}
