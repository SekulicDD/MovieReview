
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {tap} from "rxjs";
import {Injectable} from "@angular/core";
import {Movie} from "../models/Movie";
import { MoviesApiService } from "../services/api/movies-api.service";
import {
  GetMovie,
  GetMoviesCount,
  GetMoviesPaged,
  GetRecentMovies,
  GetTopMovies,
  InsertMovie
} from "../actions/Movie.actions";
import {InsertReview} from "../actions/Review.actions";
import {ReviewStateModel} from "./Review.state";

export class MovieStateModel {
  recentMovies: Movie[]=[];
  topMovies:Movie[]=[];
  movies:Movie[]=[];
  movie?:Movie;
  total:number=0;
  count:number=0;
}

@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    recentMovies: [],
    topMovies: [],
    movies:[],
    movie: undefined,
    total:0,
    count:0
  },
})

@Injectable()
export class MovieState {
  constructor(private service:MoviesApiService) {
  }

  @Selector()
  static getMovies(state: MovieStateModel){
    return state.recentMovies;
  }

  @Action(GetMoviesPaged)
  getMoviesPaged({getState,setState}:StateContext<MovieStateModel>,{movieFilters}:GetMoviesPaged){
    return this.service.getMoviesPaged(movieFilters).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        movies: returnData.data,
        total:returnData.total
      });
    }))
  }

  @Action(GetTopMovies)
  getTop({getState,setState}:StateContext<MovieStateModel>,{movieNumber}:GetTopMovies){
    return this.service.getTopMovies(movieNumber).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        topMovies: returnData,
      });
    }))
  }

  @Action(GetRecentMovies)
  getRecent({getState,setState}:StateContext<MovieStateModel>,{movieNumber}:GetRecentMovies){
    return this.service.getRecentMovies(movieNumber).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        recentMovies: returnData,
      });
    }))
  }

  @Action(GetMovie)
  getMovie({getState,setState}:StateContext<MovieStateModel>,{movie_id}:GetMovie){
    return this.service.getMovie(movie_id).pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        movie: returnData,
      });
    }))
  }

  @Action(GetMoviesCount)
  getMoviesCount({getState,setState}:StateContext<MovieStateModel>){
    return this.service.getMoviesCount().pipe(tap(returnData=>{
      const state = getState();
      setState({
        ...state,
        count: returnData,
      });
    }))
  }

  @Action(InsertMovie)
  post({getState,patchState}:StateContext<MovieStateModel>,{payload}:InsertMovie){
    return this.service.postMovie(payload).pipe(tap(returnData=>{
      const state = getState();
      patchState({
        movies: [...state.movies, returnData],
        total:state.total+1,
      });
    }))
  }
}
