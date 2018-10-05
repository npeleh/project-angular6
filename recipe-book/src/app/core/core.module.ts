import {NgModule} from '@angular/core';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app-routing.module';
import {RecipeService} from '../recipes/recipe.service';
import {DataStorageService} from '../shared/data-storage.service';
import {ModalService} from '../modal/modal.service';
import {AuthService} from '../auth/auth.service';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ModalComponent} from '../modal/modal.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {LoggingInterceptor} from '../shared/logging.interceptor';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ModalComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent,
    ModalComponent
  ],
  providers: [
    RecipeService,
    DataStorageService,
    AuthService,
    ModalService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ]
})
export class CoreModule {

}
