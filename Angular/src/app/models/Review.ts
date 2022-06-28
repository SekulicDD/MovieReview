import {MovieProperty} from "./MovieProperty";
import {User} from "./User";

export interface Review {
  user_id: number
  movie_id: number
  score: number
  text: string
  created_at: string
  updated_at: string
  movie_property: MovieProperty
  user: User
}

export interface PagedReview{
  per_page:number;
  total:number;
  data:Review[];
}
