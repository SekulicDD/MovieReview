
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import {VisitorsApiService} from "../services/api/visitors-api.service";
import {Visitor} from "../models/Visitor";
import {GetVisitorsLastMonth} from "../actions/Visitor.action";


export class VisitorStateModel {
  visitors:Visitor[]=[];
}

@State<VisitorStateModel>({
  name: 'visitors',
  defaults: {
    visitors:[],
  },
})

@Injectable()
export class VisitorState {
  constructor(private service:VisitorsApiService) {
  }

  @Selector()
  static getVisitors(state: VisitorStateModel){
    return state.visitors;
  }

  @Action(GetVisitorsLastMonth)
  getUsersCount({getState,setState}:StateContext<VisitorStateModel>){
    let count=this.service.getVisitorsLastMonth();
    const state = getState();
    return count.pipe(tap(returnData=>{
      setState({
        ...state,
        visitors:returnData
      });
    }));
  }


}
