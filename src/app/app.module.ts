import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppTitleService} from './app.title.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorDialogService} from '../providers/error-dialog/errordialog.service';
import {InterceptorProvider} from '../providers/interceptor';
import {MainRestService} from '../shared/services/main.rest';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {JWTService} from '../shared/utils/JWTtoken.service';
import {ConfigService} from '../shared/utils/config.service';
import {AuthGuard} from '../guards/auth.guard';
import {ErrorDialogComponent} from '../providers/error-dialog/errordialog.component';
import { MatDialogModule } from '@angular/material/dialog';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ErrorDialogService,
    ConfigService,
    AuthGuard,
    JWTService,
    MainRestService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
    AppTitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
