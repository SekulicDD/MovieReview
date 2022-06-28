
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Review} from "../models/Review";
import {ReviewsApiService} from "../services/api/reviews-api.service";
import {
  CheckReviewed,
  GetRecentReviews,
  GetReviewsByMovie, GetReviewsByUser, GetReviewsCount, GetReviewsUserCount,
  InsertReview,
  RemoveReview
} from "../actions/Review.actions";


export class ReviewStateModel {
  userReviews: Review[]=[];
  movieReviews:Review[]=[];
  recentReviews:Review[]=[];
  movieTotal:number=0;
  userTotal:number=0;
  alreadyReviewed:boolean=false;
  count:number=0;
}

@State<ReviewStateModel>({
  name: 'reviews',
  defaults: {
    userReviews: [],
    movieReviews: [],
    recentReviews:[],
    movieTotal:0,
    userTotal:0,
    alreadyReviewed:false,
    count:0
  },
})

@Injectable()
export class ReviewState {
  constructor(private service:ReviewsApiService) {
  }

  @Selector()
  static getReviews(state: ReviewStateModel){
    return state.movieReviews;
  }

  @Action(GetReviewsCount)
  getReviewsTotal({getState,setState}:StateContext<ReviewStateModel>){
    return this.service.getReviewsCount().pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        count:returnData
      });
    }))
  }


  @Action(GetReviewsUserCount)
  getUserTotal({getState,setState}:StateContext<ReviewStateModel>,{user_id}:GetReviewsUserCount){
    return this.service.getUserReviewsCount(user_id).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        userTotal: returnData,
      });
    }))
  }

  @Action(GetRecentReviews)
  getRecent({getState,setState}:StateContext<ReviewStateModel>){
    return this.service.getRecentReviews(4).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        recentReviews: returnData,
      });
    }))
  }

  @Action(GetReviewsByUser)
  getUserRev({getState,setState}:StateContext<ReviewStateModel>,{page,user_id}:GetReviewsByUser){
    return this.service.getReviewsByUser(page,user_id).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        userReviews: returnData.data,
        userTotal:returnData.total
      });
    }))
  }

  @Action(GetReviewsByMovie)
  getByMovie({getState,setState}:StateContext<ReviewStateModel>,{page,id,per_page}:GetReviewsByMovie){
    return this.service.getReviewsByMovie(page,id,per_page).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        movieReviews: returnData.data,
        movieTotal:returnData.total
      });
    }))
  }

  @Action(CheckReviewed)
  getByUserMovie({getState,setState}:StateContext<ReviewStateModel>,{user_id,movie_id}:CheckReviewed){
    return this.service.getReviewsByUserMovie(user_id,movie_id).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        alreadyReviewed: !!returnData
      });
    }))
  }

  @Action(InsertReview)
  post({getState,patchState}:StateContext<ReviewStateModel>,{payload}:InsertReview){
    return this.service.postReview(payload).pipe(tap(returnData=>{
      const state = getState();
      patchState({
        movieReviews: [...state.movieReviews, returnData],
        alreadyReviewed:true,
        movieTotal:state.movieTotal+1,
      });
    }))
  }

  @Action(RemoveReview)
  remove({getState,setState}:StateContext<ReviewStateModel>,{user_id,movie_id}:RemoveReview){
    return this.service.removeReview(user_id,movie_id).pipe(tap(returnData=>{
      const state = getState();
      const filteredArray1 = state.movieReviews.filter(item => item.movie_id != movie_id || item.user_id != user_id);
      const filteredArray2 = state.userReviews.filter(item => item.movie_id != movie_id || item.user_id != user_id);
      setState({
        ...state,
        movieReviews:filteredArray1,
        userReviews:filteredArray2,
        alreadyReviewed:false,
        movieTotal:state.movieTotal-1,
        userTotal:state.userTotal-1
      });
    }))
  }


}
