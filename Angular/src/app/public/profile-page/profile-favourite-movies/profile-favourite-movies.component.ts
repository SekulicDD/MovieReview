import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {Observable, Subject, takeUntil} from "rxjs";
import {Movie} from "../../../models/Movie";
import {GetFavouritesByUserId, RemoveFavourite} from "../../../actions/Favourite.action";
import {NotifierService} from "angular-notifier";
import { fadeIn } from 'src/app/animations/animations';

@Component({
  selector: 'app-profile-favourite-movies',
  templateUrl: './profile-favourite-movies.component.html',
  styleUrls: ['./profile-favourite-movies.component.css'],
  animations:[
    fadeIn
  ]
})
export class ProfileFavouriteMoviesComponent implements OnInit {

  constructor(private store:Store,private notifier:NotifierService) {
    this.movies$=this.store.select(state=>state.favourites.favMovies);

    this.store.select(state=>state.favourites.total)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data=> this.total = data);

  }

  private ngUnsubscribe = new Subject<void>();
  movies$:Observable<Movie[]>;

  page:number=1;
  itemPerPage:number=4;
  total:number=3;

  @Input() id:number=0;
  @Input() authUserId:number=0;



  ngOnInit(): void {
    this.getPage(1);
  }

  private handleResponse(data:any){
    //his.movies=data.data;
    this.total=data.total;
    this.itemPerPage=data.per_page;
  }

  getPage(p:number){
    this.page=p;
    this.store.dispatch(new GetFavouritesByUserId(this.page,this.id));
  }

  removeFavorite(movieId:number){
    this.store.dispatch(new RemoveFavourite({user_id:Number(this.authUserId),movie_id:movieId}));
    this.removeHandle();
  }

  removeHandle(){
    if(this.page>1){
      if(this.total-1<=((this.page-1)*this.itemPerPage))
        this.page--;
    }
    this.notifier.notify("success","Successfully removed!")
    this.getPage(this.page);
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

}
