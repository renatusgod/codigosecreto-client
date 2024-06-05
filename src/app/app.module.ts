import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { AuthService } from './auth/services/auth.service';
import { LoginGuardService } from './auth/services/login-guard.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthService,
    AuthGuardService,
    LoginGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
