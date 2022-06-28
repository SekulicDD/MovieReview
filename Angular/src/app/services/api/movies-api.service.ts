import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {api_url} from "../paths";
import {map} from "rxjs";
import {Movie, MovieFilter,PagedMovies} from "../../models/Movie";
import {Review} from "../../models/Review";

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {


  constructor(private http:HttpClient) {
  }

  getMoviesPaged(movieFilter:MovieFilter){
    const url=api_url.url+
      `/movies?page=${movieFilter.page}
      &catIds=${movieFilter.catIds}
      &order=${movieFilter.order}
      &search=${movieFilter.search}`;
    return this.http.get<PagedMovies>(url);
  }

  getMovie(id:number){
    const url=api_url.url+`/movie?id=${id}`;
    return this.http.get<Movie>(url);
  }

  getTopMovies(movieNumber:number){
    const url=api_url.url+`/movies-top?movieNumber=${movieNumber}`;
    return this.http.get<Movie[]>(url);
  }

  getRecentMovies(movieNumber:number){
    const url=api_url.url+`/movies-recent?movieNumber=${movieNumber}`;
    return this.http.get<Movie[]>(url);
  }

  getMoviesCount(){
    const url=api_url.url+`/movies-count`;
    return this.http.get<number>(url);
  }

  postMovie(data:any){
    const url=api_url.url+`/auth/movies-insert`;
    return this.http.post<Movie>(url,data);
  }

}


