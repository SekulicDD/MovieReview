import {Movie, MovieFilter} from "../models/Movie";

export class GetMoviesPaged{
  static readonly type = '[Movies] Get paged';
  constructor(public movieFilters:MovieFilter) {}
}
export class GetMovie{
  static readonly type = '[Movies] Get by movie_id';
  constructor(public movie_id: number) {}
}
export class GetTopMovies{
  static readonly type = '[Movies] Get ordered by score';
  constructor(public movieNumber: number) {}
}
export class GetRecentMovies{
  static readonly type = '[Movies] Get ordered by release_date';
  constructor(public movieNumber: number) {}
}
export class RemoveMovie {
  static readonly type = '[Movies] Remove';
  constructor(public payload: Movie) {}
}
export class InsertMovie {
  static readonly type = '[Movies] Insert new';
  constructor(public payload: any) { }
}
export class GetMoviesCount{
  static readonly type = '[Movies] Get total number';
}
