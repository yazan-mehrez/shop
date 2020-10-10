import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {BootstrapCarouselModule} from '../../components/bootstrap-carousel/bootstrap-carousel.module';
import {HttpClientModule} from '@angular/common/http';
import {ProductModule} from "../../modules/product.module";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  }
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    BootstrapCarouselModule,
    HttpClientModule,
    ProductModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
}
