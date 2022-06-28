import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ReviewsApiService} from "../../../services/api/reviews-api.service";
import {Store} from "@ngxs/store";
import {Review} from "../../../models/Review";
import {Observable} from "rxjs";
import {GetReviewsByMovie, RemoveReview} from "../../../actions/Review.actions";

@Component({
  selector: 'app-movie-reviews',
  templateUrl: './movie-reviews.component.html',
  styleUrls: ['./movie-reviews.component.css']
})
export class MovieReviewsComponent implements OnInit {

  constructor(private store:Store) {
    this.reviews$=this.store.select(state=>state.reviews.movieReviews);
    this.store.select(state=>state.reviews.movieTotal).subscribe(
      data=>this.total=data
    );
  }

  page:number=1;
  total:number=0;
  itemPerPage:number=2;

  reviews$:Observable<Review[]>;

  @Input() id: number=0;
  @Input() userId: number=0;

  ngOnInit(): void {
    this.getPage(1);
  }

  getPage(p:number) {
    this.page=p;
    this.getReviews();
  }

  getReviews(){
    this.store.dispatch(new GetReviewsByMovie(this.page,this.id,this.itemPerPage));
  }

  removeReview(){
    this.store.dispatch(new RemoveReview(Number(this.userId),this.id));
  }
/*  removeHandle(data:any){
    if(this.page>1){
      if((this.page-1)*this.itemPerPage<=this.total)
        this.page--;
    }
    this.alreadyReviewed();
    this.getPage(this.page);
  }*/

  getStar(i:number,score:number){
    if(i>score) {
      if(i-score>0.49 && i-score<1)
        return "starHalf.png";
      return "starEmpty.png";
    }
    return "starFull.png";
  }

}
