
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import {GetLoggedUser, GetUsersCount} from "../actions/User.action";
import {AuthService} from "../services/auth/auth.service";
import {User} from "../models/User";
import {UserApiService} from "../services/api/user-api.service";


export class UserStateModel {
  loggedUser?:User;
  count:number=0;
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    loggedUser:undefined,
    count:0
  },
})

@Injectable()
export class UserState {
  constructor(private service:AuthService,private serviceApi:UserApiService) {
  }

  @Selector()
  static getUser(state: UserStateModel){
    return state.loggedUser;
  }

  @Action(GetUsersCount)
  getUsersCount({getState,setState}:StateContext<UserStateModel>){
    let count=this.serviceApi.getUsersCount();
    const state = getState();
    return count.pipe(tap(returnData=>{
      setState({
        ...state,
        count:returnData
      });
    }));
  }

  @Action(GetLoggedUser)
  getLoggedUser({getState,setState}:StateContext<UserStateModel>){
    let user=this.service.userProfile();
    const state = getState();
    if(user!= undefined){
      return user.pipe(tap(returnData=>{
        setState({
          ...state,
          loggedUser:returnData
        });
      }))
    }
    return setState({
      ...state,
      loggedUser:undefined
    });
  }


}
