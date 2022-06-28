import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ReviewsApiService} from "../../../services/api/reviews-api.service";
import {Store} from "@ngxs/store";

import {CheckReviewed, InsertReview } from 'src/app/actions/Review.actions';


@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.component.html',
  styleUrls: ['./post-review.component.css']
})
export class PostReviewComponent implements OnInit {

  constructor(private store:Store) {
    this.store.select(state=>state.reviews.alreadyReviewed).subscribe(
      data=>this.alreadyReviewed=data
    );
  }

  reviewScore:number=1;
  reviewStars:any=[1,2,3,4,5];

  starEmpty="starEmpty.png";
  starFull="starFull.png";

  alreadyReviewed=false;

  @Input() id: number=0;
  @Input() userId: number=0;

  ngOnInit(): void {
    this.checkReviewed();
    this.reviewStars.fill(this.starEmpty,0,5);

  }

  reviewStarsClick(i:number){
    this.reviewScore=i+1;
    if(this.reviewStars[i]==this.starEmpty)
      this.reviewStars.fill(this.starFull,0,i+1);
    else{
      this.reviewStars.fill(this.starEmpty,i+1,5);
    }
  }

  submitReview(form:NgForm){
    let data=form.value;
    data.score=this.reviewScore;
    data.user_id=this.userId;
    data.movie_id=this.id;
    this.store.dispatch(new InsertReview(data));
  }

  checkReviewed(){
    this.store.dispatch(new CheckReviewed(this.userId,this.id));
  }

}
