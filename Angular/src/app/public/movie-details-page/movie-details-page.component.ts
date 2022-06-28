import { Component, OnInit } from '@angular/core';
import {MoviesApiService} from "../../services/api/movies-api.service";
import {ActivatedRoute} from "@angular/router";

import {TokenService} from "../../services/auth/token.service";
import {Observable} from "rxjs";
import {Movie} from "../../models/Movie";
import {Store} from "@ngxs/store";
import {GetMovie} from "../../actions/Movie.actions";

@Component({
  selector: 'app-movie-details-page',
  templateUrl: './movie-details-page.component.html',
  styleUrls: ['./movie-details-page.component.css']
})
export class MovieDetailsPageComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private tokenService:TokenService,
              private store:Store) {
    this.movie$=this.store.select(state=> state.movies.movie);
  }

  userId:number=0;
  id:number=1;
  videoUrl:string="";
  urlSettings:string="?rel=0&amp;showinfo=0&amp;modestbranding=1&amp;iv_load_policy=3";

  movie$:Observable<Movie>;

  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.store.dispatch(new GetMovie(this.id));
    if(this.tokenService.isLoggedIn())
      this.userId=this.tokenService.getUserId();
  }

  getStar(i:number,score:number){
    if(i>score) {
      if(i-score>0.49 && i-score<1)
        return "starHalf.png";
      return "starEmpty.png";
    }
    return "starFull.png";
  }

}

