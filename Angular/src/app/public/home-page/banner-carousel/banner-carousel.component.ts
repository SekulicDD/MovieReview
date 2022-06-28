import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from 'src/app/services/api/movies-api.service';
import {ActiveDisabled, fadeInOut} from "../../../animations/animations";
import {Store} from "@ngxs/store";
import {Movie} from "../../../models/Movie";
import {Observable} from "rxjs";
import {GetTopMovies} from "../../../actions/Movie.actions";


@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.css'],
  animations:[
    ActiveDisabled,
    fadeInOut,
  ]
})
export class BannerCarouselComponent implements OnInit {

  constructor(private moviesApiService: MoviesApiService,private store:Store) {
    this.movies$=this.store.select(state=> state.movies.topMovies);
  }

  //movies:any;
  activeVideo:number=0;
  movies$:Observable<Movie[]>;

  ngOnInit(): void {
    this.store.dispatch(new GetTopMovies(3));
  }

  setActive(id:number){
    this.activeVideo=id;
  }


}
