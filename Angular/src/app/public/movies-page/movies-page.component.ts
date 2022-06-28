import { Component, OnInit } from '@angular/core';
import {fadeInOut} from "../../animations/animations";
import {MoviesApiService} from "../../services/api/movies-api.service";
import {FavouritesApiService} from "../../services/api/favourites-api.service";
import {MovieCompSetupService} from "../../services/movie-comp-setup.service";
import {Category} from "../../models/Category";
import {Observable, Subject, takeUntil} from "rxjs";
import {Store} from "@ngxs/store";
import {GetCategories} from "../../actions/Category.action";
import {Movie, MovieFilter} from "../../models/Movie";
import {GetMoviesPaged} from "../../actions/Movie.actions";


@Component({
  selector: 'app-movies-page',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css'],
  animations:[
    fadeInOut
  ]
})


export class MoviesPageComponent implements OnInit {

  constructor(private movieSetupService:MovieCompSetupService,
              private store:Store)
  {
    this.categories$ =store.select(state=>state.categories.categories);

    store.select(state=>state.movies.movies).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data=>{
        this.movies=data;
        this.alreadyFavourite=this.movieSetupService.getAlreadyFavouriteArr(this.movies);
      }
    );

    this.store.select(state=>state.movies.total).pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      data=>{
        this.total=data
      }
    );
  }

  private ngUnsubscribe = new Subject<void>();

  categories$:Observable<Category[]>;

  movies:Movie[]=[];
  page:number=1;
  itemPerPage:number=8;
  total:number=1;

  filterCategories:any=[];

  order="title";
  search="";

  alreadyFavourite:boolean[]=[];

  ngOnInit(): void {
    this.store.dispatch(new GetCategories());
    this.movieSetupService.serviceSetFavourites();
    this.getPage(1);
  }

  getPage(p:number)
  {
    this.page=p;
    let data={
      page: this.page,
      catIds:this.filterCategories.toString(),
      order: this.order,
      search: this.search
    }
    this.store.dispatch(new GetMoviesPaged(data));
  }

  switchCategories(catId:number){
    let tmp=true;
    this.filterCategories.forEach((value:any,index:any)=>{
      if(value==catId) {
        this.filterCategories.splice(index, 1);
        tmp=false;
      }
    });
    if(tmp)
      this.filterCategories.push(catId);
    this.getPage(1);
  }

  switchOrder(event:any){
    if(this.order!=event.target.value){
      this.order=event.target.value;
    }
    this.getPage(1);
  }

  searchWord(event:any){
    if(this.search!=event.target.value){
      this.search=event.target.value;
    }
    this.getPage(1);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }


}
