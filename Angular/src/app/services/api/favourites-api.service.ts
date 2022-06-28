import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api_url} from "../paths";
import {Favourite} from "../../models/Favourite";
import {Movie, PagedMovies} from "../../models/Movie";

@Injectable({
  providedIn: 'root'
})
export class FavouritesApiService {

  constructor(private http:HttpClient) { }

  getFavouritesByUserId(page:number,id:number){
    const url=api_url.url+`/favourites?page=${page}&id=${id}`;
    return this.http.get<PagedMovies>(url);
  }

  getFavouritesUser(id:number){
    const url=api_url.url+`/favourites-all?userId=${id}`;
    return this.http.get<Favourite[]>(url);
  }

  removeFavorite(userId:number,movieId:number){
    const url=api_url.url+`/auth/favourites-remove`;
    let data={"user_id":userId,"movie_id":movieId};
    return this.http.post(url,data);
  }

  addFavorite(userId:number,movieId:number){
    const url=api_url.url+`/auth/favourites-insert`;
    let data={"user_id":userId,"movie_id":movieId} ;
    return this.http.post<any>(url,data);
  }

}
