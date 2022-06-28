import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {Movie} from "../../models/Movie";
import {Observable} from "rxjs";
import {GetMovie, GetMoviesPaged} from "../../actions/Movie.actions";
import {Category} from "../../models/Category";
import {GetCategories} from "../../actions/Category.action";

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.css']
})
export class MoviesTableComponent implements OnInit {

  constructor(private store:Store) {
    this.movies$=this.store.select(state=>state.movies.movies);
    this.total$=this.store.select(state=>state.movies.total);
    this.categories$=this.store.select(state=>state.categories.categories);
  }

  movies$:Observable<Movie[]>;
  categories$:Observable<Category[]>;
  total$:Observable<number>;

  page:number=1;
  itemPerPage:number=8;

  order="3";
  search="";

  ngOnInit(): void {
    this.getPage(1);
    this.store.dispatch(new GetCategories());
  }

  getPage(p:number)
  {
    this.page=p;
    let data={
      page: this.page,
      catIds:"",
      order: this.order,
      search: this.search
    }
    this.store.dispatch(new GetMoviesPaged(data));
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

  getEditEventId(value:number){
    this.store.dispatch(new GetMovie(value));
    //DOHVATANJE PODATAKA ZA EDIT FORMU
  }

}
