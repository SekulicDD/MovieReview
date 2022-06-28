import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {Movie} from "../../../models/Movie";
import {Review} from "../../../models/Review";
import {GetFavouritesByUserId} from "../../../actions/Favourite.action";
import {GetReviewsByUser, RemoveReview} from "../../../actions/Review.actions";
import {NotifierService} from "angular-notifier";
import {fadeIn} from "../../../animations/animations";

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.css'],
  animations:[
    fadeIn
  ]
})
export class ProfileReviewsComponent implements OnInit {

  constructor(private store:Store,private notifier:NotifierService) {
    this.reviews$=this.store.select(state=>state.reviews.userReviews);
  }

  ngOnInit(): void {
    this.getPage(1);
  }

  reviews$:Observable<Review[]>;
  page:number=1;
  itemPerPage:number=4;
  total:number=3;

  dataSet:boolean = false;

  @Input() authUserId:number=0;
  @Input() id:number=0;

  getPage(p:number){
    this.page=p;
    this.store.dispatch(new GetReviewsByUser(this.page,this.authUserId));
    this.dataSet=true;
  }

  getStar(i:number,score:number){
    if(i>score) {
      if(i-score>0.49 && i-score<1)
        return "starHalf.png"
      return "starEmpty.png";
    }
    return "starFull.png";
  }

  removeReview(movieId:number){
    this.store.dispatch(new RemoveReview(this.authUserId,movieId));
    this.removeHandle();
  }

  removeHandle(){
    if(this.page>1){
      if(this.total-1<=((this.page-1)*this.itemPerPage))
        this.page--;
    }
    this.notifier.notify("success","Successfully removed!");
    this.getPage(this.page);
  }

}
