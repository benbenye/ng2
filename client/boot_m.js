import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { enableProdMode, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate/ng2-translate';

import { routes } from './app/core/app.routes_m';
import { CORE_PROVIDERS, CORE_DECLARATIONS, AppComponent } from './app/core/index_m';
import { AUTH_PROVIDERS, AUTH_DECLARATIONS } from './app/auth';
import { POSTS_PROVIDERS, POSTS_DECLARATIONS } from './app/posts';
import { TOPIC_DECLARATIONS } from './app/topic/index_m';

import { INDEX_PROVIDERS, INDEX_DECLARATIONS } from './app/index/index_m';
import { CATEGORYLSIT_PROVIDERS, CATEGORYLIST_DECLARATIONS } from './app/category/index_m';
import { BANNER_DECLARATIONS } from './app/banner/index_m';
import { PRODUCTLISTITEM_DECLARATIONS } from './app/product/index_m';
import { ORDER_DECLARATIONS } from './app/order/index_m';
import { USER_DECLARATIONS } from './app/user/index_m';


if (ENVIRONMENT === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [
    CORE_DECLARATIONS,
    AUTH_DECLARATIONS,
    POSTS_DECLARATIONS,
    INDEX_DECLARATIONS,
    CATEGORYLIST_DECLARATIONS,
    BANNER_DECLARATIONS,
    PRODUCTLISTITEM_DECLARATIONS,
    ORDER_DECLARATIONS,
    USER_DECLARATIONS,
    TOPIC_DECLARATIONS
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule, ReactiveFormsModule,
    TranslateModule.forRoot(),
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
    CORE_PROVIDERS,
    AUTH_PROVIDERS,
    POSTS_PROVIDERS,
    INDEX_PROVIDERS,
    CATEGORYLSIT_PROVIDERS,
    { provide: 'ENVIRONMENT', useValue: ENVIRONMENT }
  ],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);