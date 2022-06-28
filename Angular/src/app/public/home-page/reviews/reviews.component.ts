import { Component, OnInit } from '@angular/core';
import { ReviewsApiService } from 'src/app/services/api/reviews-api.service';
import {Observable} from "rxjs";
import {Review} from "../../../models/Review";
import {Store} from "@ngxs/store";
import {GetRecentReviews} from "../../../actions/Review.actions";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  reviews$:Observable<Review[]>;

  constructor(private store:Store) {
    this.reviews$=store.select(state=> state.reviews.recentReviews);
  }

  ngOnInit(): void {
    this.store.dispatch(new GetRecentReviews())
  }

}
