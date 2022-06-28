import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {fadeIn} from "../../animations/animations";
import {TokenService} from "../../services/auth/token.service";
import {Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {User} from "../../models/User";
import {GetReviewsByUser, GetReviewsCount, GetReviewsUserCount} from "../../actions/Review.actions";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  animations:[
    fadeIn
  ]
})
export class ProfilePageComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private tokenService:TokenService,
              private store:Store) {
    this.totalRev$=this.store.select(state=>state.reviews.userTotal);
  }

  totalRev$:Observable<Number>;

  id:number=1;
  authUserId:number=0;

  user?:User;

  favTabActive:boolean=true;
  revTabActive:boolean=false;

  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.getAuthUserId();

    this.store.select(state=>state.users.loggedUser).subscribe({
      next: data=>this.user=data,
      error: error=>console.log(error)
    });

    this.store.dispatch(new GetReviewsUserCount(this.authUserId));
  }

  getAuthUserId(){
    let token=this.tokenService.getToken();
    if(token) {
      this.authUserId = this.tokenService.payload(token).sub;
    }
  }

  changeActiveTab(tabId:number){
    this.favTabActive = tabId == 1;
    this.revTabActive=!this.favTabActive;
  }

}
