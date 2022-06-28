
import {Action, Selector, State, StateContext} from "@ngxs/store";

import {Injectable} from "@angular/core";
import {FavouritesApiService} from "../services/api/favourites-api.service";
import {tap} from "rxjs";
import {
  GetFavouritesByUserId,
  GetFavouritesUserAll,
  InsertFavourite,
  RemoveFavourite
} from "../actions/Favourite.action";
import { Favourite } from "../models/Favourite";
import {MovieStateModel} from "./Movie.state";
import {Movie} from "../models/Movie";

export class FavouriteStateModel {
  favourites: Favourite[]=[];
  favMovies:Movie[]=[];
  total:number=0;
}

@State<FavouriteStateModel>({
  name: 'favourites',
  defaults: {
    favourites: [],
    favMovies:[],
    total:0
  },
})

@Injectable()
export class FavouriteState {
  constructor(private service:FavouritesApiService) {
  }

  @Selector()
  static getFavourites(state: FavouriteStateModel){
    return state.favourites;
  }

  @Action(GetFavouritesUserAll)
  getAll({getState,setState}:StateContext<FavouriteStateModel>,{user_id}:GetFavouritesUserAll){
    return this.service.getFavouritesUser(user_id).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        favourites: returnData,
      });
    }))
  }

  @Action(GetFavouritesByUserId)
  get({getState,setState}:StateContext<FavouriteStateModel>,{user_id,page}:GetFavouritesByUserId){
    return this.service.getFavouritesByUserId(page,user_id).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        favMovies: returnData.data,
        total:returnData.total
      });
    }))
  }

  @Action(InsertFavourite)
  post({getState,patchState}:StateContext<FavouriteStateModel>,{payload}:InsertFavourite){
    return this.service.addFavorite(payload.user_id,payload.movie_id).pipe(tap(returnData=>{
      const state = getState();
      patchState({
        favourites: [...state.favourites, returnData.fav],
        favMovies: [...state.favMovies, returnData.movie],
      });
    }))
  }

  @Action(RemoveFavourite)
  remove({getState,setState}:StateContext<FavouriteStateModel>,{payload}:RemoveFavourite){
    return this.service.removeFavorite(payload.user_id,payload.movie_id).pipe(tap(returnData=>{
      const state = getState();
      const filteredArray1 = state.favMovies.filter(item => item.id != payload.movie_id);
      const filteredArray2 = state.favourites.filter(item => item.movie_id != payload.movie_id || item.user_id != payload.user_id );
      let minus=1;
      if(state.total==0)
        minus=0;
      setState({
        ...state,
        favMovies:filteredArray1,
        favourites:filteredArray2,
        total: state.total-minus
      });
    }))
  }

}
