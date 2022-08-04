import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginActivate } from './login/login.guard';
import { HttpGlobalInterceptor } from '../core/http.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { CustomMaterialModule } from '../core/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import { KeycloakLoginComponent } from './keycloak-login/keycloak-login.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    KeycloakLoginComponent,
    WelcomePageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    LoginActivate,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpGlobalInterceptor,
      multi: true
    },
    LoginComponent,
    AuthService
  ]
})
export class AuthModule { }
