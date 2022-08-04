import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginActivate } from './auth/login/login.guard';
import { RegisterComponent } from './auth/register/register.component';
import { KeycloakLoginComponent } from './auth/keycloak-login/keycloak-login.component';
import { WelcomePageComponent } from './auth/welcome-page/welcome-page.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { BookManagementComponent } from './book-management/book-management.component';
import { AddBooksComponent } from './book-management/add-books/add-books.component';
import { EditBooksComponent } from './book-management/edit-books/edit-books.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  {
    path: '',
    component: WelcomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginActivate]
  },
  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full'
  },
  {
    path : 'keycloakLogin',
    component : KeycloakLoginComponent
  }, {
    path: 'profile',
    component: ProfileComponent,
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BookManagementComponent,
    pathMatch: 'full'
  },
  {
    path: 'addBook',
    component: AddBooksComponent,
    pathMatch: 'full'
  },
  {
    path: 'editBook',
    component: EditBooksComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
