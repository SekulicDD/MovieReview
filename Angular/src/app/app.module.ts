import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MovieDetailsPageComponent } from './public/movie-details-page/movie-details-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {HttpClientModule} from "@angular/common/http";
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { ResetPasswordResponseComponent } from './reset-password-response/reset-password-response.component';
import { MovieReviewsComponent } from './public/movie-details-page/movie-reviews/movie-reviews.component';
import { PostReviewComponent } from './public/movie-details-page/post-review/post-review.component';
import { MovieComponent } from './public/movie/movie.component';
import {NotifierModule, NotifierOptions} from "angular-notifier";
import { PublicComponent } from './public/public.component';
import { AdminComponent } from './admin/admin.component';
import {HeaderComponent} from "./public/header/header.component";
import {FooterComponent} from "./public/footer/footer.component";
import {MoviesPageComponent} from "./public/movies-page/movies-page.component";
import {HomePageComponent} from "./public/home-page/home-page.component";
import {BannerCarouselComponent} from "./public/home-page/banner-carousel/banner-carousel.component";
import {MoviesCarouselComponent} from "./public/home-page/movies-carousel/movies-carousel.component";
import {ReviewsComponent} from "./public/home-page/reviews/reviews.component";
import {ProfilePageComponent} from "./public/profile-page/profile-page.component";
import {LoginPageComponent} from "./public/login-page/login-page.component";
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { MainAnalyticsComponent } from './admin/dashboard/main-analytics/main-analytics.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { VisitorChartComponent } from './admin/dashboard/visitor-chart/visitor-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxsModule } from '@ngxs/store';
import {CategoryState} from "./state/Category.state";
import {environment} from "../environments/environment";
import {NgxsLoggerPluginModule} from "@ngxs/logger-plugin";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {ReviewState} from "./state/Review.state";
import {FavouriteState} from "./state/Favourite.state";
import {MovieState} from "./state/Movie.state";
import { ProfileFavouriteMoviesComponent } from './public/profile-page/profile-favourite-movies/profile-favourite-movies.component';
import { PaginatorComponent } from './public/paginator/paginator.component';
import { ProfileReviewsComponent } from './public/profile-page/profile-reviews/profile-reviews.component';
import { UserState } from './state/User.state';
import {VisitorState} from "./state/Visitor.state";
import { MoviesTableComponent } from './admin/movies-table/movies-table.component';
import { MovieRowComponent } from './admin/movies-table/movie-row/movie-row.component';
import { EditMovieFormComponent } from './admin/movies-table/edit-movie-form/edit-movie-form.component';
import { InsertFormComponent } from './admin/movies-table/insert-form/insert-form.component';


const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 25
    },
    vertical: {
      position: 'bottom',
      distance: 25,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 3500,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 3
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    FooterComponent,
    MoviesPageComponent,
    BannerCarouselComponent,
    MoviesCarouselComponent,
    ReviewsComponent,
    MovieDetailsPageComponent,
    ProfilePageComponent,
    SafeUrlPipe,
    FilterByCategoryPipe,
    LoginPageComponent,
    ResetPasswordPageComponent,
    ResetPasswordResponseComponent,
    MovieReviewsComponent,
    PostReviewComponent,
    MovieComponent,
    PublicComponent,
    AdminComponent,
    SideNavComponent,
    MainAnalyticsComponent,
    DashboardComponent,
    VisitorChartComponent,
    ProfileFavouriteMoviesComponent,
    PaginatorComponent,
    ProfileReviewsComponent,
    MoviesTableComponent,
    MovieRowComponent,
    EditMovieFormComponent,
    InsertFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxsModule.forRoot([
      MovieState,
      CategoryState,
      ReviewState,
      FavouriteState,
      UserState,
      VisitorState,
    ],{ developmentMode: !environment.production }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
