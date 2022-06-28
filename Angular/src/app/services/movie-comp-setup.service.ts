import {Inject, Injectable} from '@angular/core';
import {TokenService} from "./auth/token.service";
import {Store} from "@ngxs/store";
import {Subject, takeUntil} from "rxjs";
import {GetFavouritesUserAll} from "../actions/Favourite.action";
import {Favourite} from "../models/Favourite";


@Injectable({
  providedIn: 'root'
})

export class MovieCompSetupService {

  constructor(private tokenService:TokenService,
              private store:Store) {
    this.store.select(state=>state.favourites.favourites)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data=>this.favourites=data);
  }

  private ngUnsubscribe = new Subject<void>();
  private favourites:any=[];

  public getAlreadyFavouriteArr(movies:any[]) {
    let alreadyFavourite: boolean[] = [];

    for (var i=0;i<movies.length;i++){
      let tmp=false;
      this.favourites.forEach((fav:Favourite)=>{
        if(movies[i].id==fav.movie_id) {
          alreadyFavourite.push(true);
          tmp=true;
        }
      })
      if(!tmp)
        alreadyFavourite.push(false);
    }
    return alreadyFavourite;
  }

  public serviceSetFavourites(){
    if(this.tokenService.isLoggedIn()) {
      this.store.dispatch(new GetFavouritesUserAll(this.tokenService.getUserId()));
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete()
  }

}
