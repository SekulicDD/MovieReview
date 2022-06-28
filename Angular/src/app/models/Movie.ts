import {Category} from "./Category";
import {MovieProperty} from "./MovieProperty";

export interface Movie {
  id: number;
  title: string;
  duration: number;
  releaseDate: string;
  summary: string;
  score?: any;
  created_at?: any;
  updated_at: Date;
  categories: Category[];
  movie_properties: MovieProperty;
  alreadyFavourite: boolean;
}

export interface PagedMovies{
  per_page:number;
  total:number;
  data:Movie[];
}

export interface MovieFilter{
  page:number;
  catIds:string;
  order:string;
  search:string;
}

export interface insertMovie{
  movie:Movie;
  image:string;
}
