import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from 'src/app/services/api/movies-api.service';
import {fadeIn} from "../../../animations/animations";
import {MovieCompSetupService} from "../../../services/movie-comp-setup.service";
import {Store} from "@ngxs/store";
import {GetRecentMovies} from "../../../actions/Movie.actions";

@Component({
  selector: 'app-movies-carousel',
  templateUrl: './movies-carousel.component.html',
  styleUrls: ['./movies-carousel.component.css'],
  animations:[
    fadeIn
  ]
})
export class MoviesCarouselComponent implements OnInit {

  constructor(private store:Store) {
    this.store.select(state=>state.movies.recentMovies).subscribe(
      data=> {
        this.setupData(data);
      }
    )
  }

  movies:any;

  carouselItems:any=[];
  indexRight:number=4;
  indexLeft:number=0;
  itemsToShow:number=5;
  len:number=0;

  alreadyFavourite:boolean[]=[];

  ngOnInit(): void {
    this.store.dispatch(new GetRecentMovies(7));
  }

  setupData(data:any){
    this.movies=data;
    this.len=this.movies.length;
    this.indexRight=this.itemsToShow-1;
    this.carouselItems=this.movies.slice(0,this.itemsToShow);
  }

  moveRight(){
    for (var i=1;i<this.itemsToShow;i++){
      this.carouselItems[i-1]=this.carouselItems[i];
    }
    this.incrementRight();
    this.incrementLeft();
    this.carouselItems[this.itemsToShow-1]=this.movies[this.indexRight];
  }

  moveLeft(){
    for (var i=this.itemsToShow-1;i>0;i--){
      this.carouselItems[i]=this.carouselItems[i-1];
    }
    this.decreaseLeft();
    this.decreaseRight();
    this.carouselItems[0]=this.movies[this.indexLeft];
  }

  private incrementLeft(){
    this.indexLeft++;
    if(this.indexLeft>=this.len)
      this.indexLeft=0
  }

  private incrementRight(){
    this.indexRight++;
    if(this.indexRight>=this.len)
      this.indexRight=0
  }

  private decreaseLeft(){
    this.indexLeft--;
    if(this.indexLeft<0)
      this.indexLeft=this.len-1;
  }

  private decreaseRight(){
    this.indexRight--;
    if(this.indexRight<0)
      this.indexRight=this.len-1;
  }

}
