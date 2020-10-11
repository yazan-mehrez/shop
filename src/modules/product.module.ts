import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductCardComponent} from '../app/products/product-card/product-card.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProductCardComponent
  ],
  exports: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class ProductModule {
}
