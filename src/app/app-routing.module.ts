import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
    data: {
      title: '_ShoppingCart'
    },
    pathMatch: 'full'
  },
  {
    path: 'page-404',
    loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-404',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled',
    relativeLinkResolution: 'corrected',
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
