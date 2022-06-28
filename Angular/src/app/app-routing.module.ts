import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import {BeforeLoginService} from "./services/permissions/before-login.service";
import {ResetPasswordResponseComponent} from "./reset-password-response/reset-password-response.component";
import {PublicComponent} from "./public/public.component";
import {HomePageComponent} from "./public/home-page/home-page.component";
import {MoviesPageComponent} from "./public/movies-page/movies-page.component";
import {MovieDetailsPageComponent} from "./public/movie-details-page/movie-details-page.component";
import {ProfilePageComponent} from "./public/profile-page/profile-page.component";
import {LoginPageComponent} from "./public/login-page/login-page.component";
import {AdminComponent} from "./admin/admin.component";
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import {MoviesTableComponent} from "./admin/movies-table/movies-table.component";



const routes: Routes = [
  {
    path:"",
    component:PublicComponent,
    children: [
      {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
      },
      {
        path:"home",
        component:HomePageComponent,
      },
      {
        path:"movies",
        component:MoviesPageComponent,
      },
      {
        path:"movie/:id",
        component:MovieDetailsPageComponent,
      },
      {
        path:"profile/:id",
        component:ProfilePageComponent,
      },
      {
        path:"login",
        component:LoginPageComponent,
        canActivate:[BeforeLoginService],
      },
    ]
  },
  {
    path:"admin",
    component:AdminComponent,
    children: [
      {
        path:"dashboard",
        component:DashboardComponent,
      },
      {
        path:"movies",
        component:MoviesTableComponent,
      }
    ]
  },
  {
    path:"reset-password",
    component:ResetPasswordPageComponent,
    canActivate:[BeforeLoginService],
  },
  {
    path:"reset-password-response",
    component:ResetPasswordResponseComponent,
    canActivate:[BeforeLoginService],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
