import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api_url} from "../paths";
import {PagedReview, Review} from "../../models/Review";
import {map, pipe} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewsApiService {

  constructor(private http:HttpClient) { }

  getReviewsByMovie(page:number,id:number,per_page:number){
    const url=api_url.url+`/reviews-movie?page=${page}&id=${id}&per_page=${per_page}`;
    return this.http.get<PagedReview>(url);
  }

  getReviewsByUser(page:number,id:number){
    const url=api_url.url+`/reviews-user?page=${page}&id=${id}`;
    return this.http.get<PagedReview>(url);
  }

  getReviewsByUserMovie(user_id:number,movie_id:number){
    const url=api_url.url+`/reviews-user-movie?userId=${user_id}&movieId=${movie_id}`;
    return this.http.get<Review[]>(url);
  }

  getRecentReviews(reviewNumber:number){
    const url=api_url.url+`/reviews-recent?reviewNumber=${reviewNumber}`;
    return this.http.get<Review[]>(url);

  }

  removeReview(userId:number,movieId:number){
    const url=api_url.url+`/auth/reviews-remove`;
    let data={"user_id":userId,"movie_id":movieId};
    return this.http.post(url,data);
  }

  postReview(data:any){
    const url=api_url.url+`/auth/reviews-insert`;
    return this.http.post<Review>(url,data);
  }

  getReviewsCount(){
    const url=api_url.url+`/reviews-count`;
    return this.http.get<number>(url);
  }

  getUserReviewsCount(user_id:number){
    const url=api_url.url+`/reviews-user-count?userId=${user_id}`;
    return this.http.get<number>(url);
  }


}

