import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule } from './layouts';
import { AppRoutingModule } from './app-routing.module';
import { ScreenService } from './shared/services/screen.service';
import { AppInfoService } from './shared/services/app-info.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/services/auth-interceptor.service';
import { LoginComponent } from './shared/components/login/login.component';
import {
  DxFormModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { SignUpComponent } from './shared/components/sign-up/sign-up.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    AppRoutingModule,
    HttpClientModule,
    DxFormModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxScrollViewModule,
  ],
  providers: [
    ScreenService,
    AppInfoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
