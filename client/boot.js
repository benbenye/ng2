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

import { routes } from './app/core/app.routes';
import { CORE_PROVIDERS, CORE_DECLARATIONS, AppComponent } from './app/core';
import { AUTH_PROVIDERS, AUTH_DECLARATIONS } from './app/auth';
import { POSTS_PROVIDERS, POSTS_DECLARATIONS } from './app/posts';
import { ORDER_DECLARATIONS } from './app/order';

import { INDEX_PROVIDERS, INDEX_DECLARATIONS } from './app/index';
import { CATEGORYLSIT_PROVIDERS, CATEGORYLIST_DECLARATIONS } from './app/category';
import { BANNER_DECLARATIONS } from './app/banner';
import { PRODUCTLISTITEM_DECLARATIONS } from './app/product';

import { GAME_DECLARATIONS, GAME_PROVIDERS } from './app/game';


if (ENVIRONMENT === 'production') {
  enableProdMode();
}

@NgModule({
  declarations: [
    CORE_DECLARATIONS,
    AUTH_DECLARATIONS,
    POSTS_DECLARATIONS,
    ORDER_DECLARATIONS,
    INDEX_DECLARATIONS,
    CATEGORYLIST_DECLARATIONS,
    BANNER_DECLARATIONS,
    PRODUCTLISTITEM_DECLARATIONS,
    GAME_DECLARATIONS
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
    GAME_PROVIDERS,
    { provide: 'ENVIRONMENT', useValue: ENVIRONMENT }
  ],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);