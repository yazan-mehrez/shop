import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule),
    data: {
      title: '_Home'
    }
  },
  {
    path: '',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },
  {
    path: 'page-404',
    loadChildren: () => import('../modules/page-not-found.module').then(m => m.PageNotFoundModule),
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
