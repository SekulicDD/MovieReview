import {Component, Input, OnInit} from '@angular/core';
import {TokenService} from "../../services/auth/token.service";
import { NotifierService } from 'angular-notifier';
import {Store} from "@ngxs/store";
import {InsertFavourite, RemoveFavourite} from "../../actions/Favourite.action";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  constructor(private tokenService:TokenService,
              private notifierService:NotifierService,
              private store:Store) {
  }

  @Input() item:any;
  userId:number=0;
  @Input() alreadyFavorite=false;
  @Input() showFav=true;

  ngOnInit(): void {
    if(this.tokenService.isLoggedIn())
      this.userId=this.tokenService.getUserId();
  }

  addToFavourites(){
    this.store.dispatch(new InsertFavourite({user_id:this.userId,movie_id:this.item.id}));
    this.notifierService.notify("success","Successfully added to favourites!");
    this.alreadyFavorite=true;
  }

  removeFromFavourites(){
    this.store.dispatch(new RemoveFavourite({user_id:this.userId,movie_id:this.item.id}));
    this.notifierService.notify("success","Item successfully removed!");
    this.alreadyFavorite=false;
  }


}
