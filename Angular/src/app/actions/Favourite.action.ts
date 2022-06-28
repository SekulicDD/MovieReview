import {Movie} from "../models/Movie";
import {Favourite} from "../models/Favourite";

export class GetFavouritesByUserId {
  static readonly type = '[Favourites] Get by user_id paged';
  constructor(public page:number,public user_id:number) {}
}
export class GetFavouritesUserAll {
  static readonly type = '[Favourites] Get by user_id all';
  constructor(public user_id:number) { }
}
export class RemoveFavourite {
  static readonly type = '[Favourites] Remove';
  constructor(public payload:Favourite) {}
}
export class InsertFavourite {
  static readonly type = '[Favourites] Insert new';
  constructor(public payload:Favourite) { }
}
