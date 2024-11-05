import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login';
import { AuthenticationService, BackendService, PagerService } from './_services';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from "ng2-charts";  
import { AboutComponent } from './about';
import { NotFoundPageComponent } from './notfoundpage';
import { ConfirmDialog } from './shared/dialog.component';
import { LoadingComponent } from  './loading';
import { AuthGuard } from './_guard';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    AboutComponent,
    NotFoundPageComponent,
    ConfirmDialog,
    LoadingComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ChartsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    BackendService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
