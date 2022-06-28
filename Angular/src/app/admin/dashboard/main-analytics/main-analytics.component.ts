import { Component, OnInit } from '@angular/core';
import {MoviesApiService} from "../../../services/api/movies-api.service";
import {Observable, Subject, takeUntil} from "rxjs";
import { ReviewsApiService } from 'src/app/services/api/reviews-api.service';
import {UserApiService} from "../../../services/api/user-api.service";
import {Store} from "@ngxs/store";
import {GetMoviesCount} from "../../../actions/Movie.actions";
import {GetReviewsCount} from "../../../actions/Review.actions";
import {GetUsersCount} from "../../../actions/User.action";

@Component({
  selector: 'app-main-analytics',
  templateUrl: './main-analytics.component.html',
  styleUrls: ['./main-analytics.component.css']
})
export class MainAnalyticsComponent implements OnInit {

  constructor(private store:Store) {
    this.movieCount$=this.store.select(state=>state.movies.count);
    this.reviewsCount$=this.store.select(state=>state.reviews.count);
    this.userCount$=this.store.select(state=>state.users.count);
  }

  movieCount$:Observable<number>;
  reviewsCount$:Observable<number>;
  userCount$:Observable<number>;

  userCount:number=0;

  ngOnInit(): void {
    this.store.dispatch(new GetMoviesCount());
    this.store.dispatch(new GetReviewsCount());
    this.store.dispatch(new GetUsersCount());
  }



}
