import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from '../app/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {BootstrapCarouselModule} from '../components/bootstrap-carousel/bootstrap-carousel.module';
import {HttpClientModule} from '@angular/common/http';

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
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule {
}
