import {Category} from "../models/Category";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {GetCategories} from "../actions/Category.action"
import {CategoriesApiService} from "../services/api/categories-api.service";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";

export class CategoryStateModel {
  categories: Category[]=[];
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    categories: []
  },
})

@Injectable()
export class CategoryState {
  constructor(private service:CategoriesApiService) {
  }

  @Selector()
  static getCategories(state: CategoryStateModel){
    return state.categories;
  }

  @Action(GetCategories)
  get({getState,setState}:StateContext<CategoryStateModel>){
    return this.service.getCategories().pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        categories: returnData,
      });
    }))
  }
}
