import {Review} from "../models/Review";

export class GetReviewsByMovie {
  static readonly type = '[Reviews] Get by movie_id';
  constructor(public page:number,public id: number,public per_page:number) { }
}
export class GetReviewsByUser {
  static readonly type = '[Reviews] Get by user_id';
  constructor(public page:number,public user_id: number) {}
}
export class CheckReviewed {
  static readonly type = '[Reviews] Get by user_id and movie_id to check if reviewed';
  constructor(public user_id: number,public movie_id: number) {}
}
export class GetRecentReviews {
  static readonly type = '[Reviews] Get ordered by created_at';
}

export class GetReviewsCount {
  static readonly type = '[Reviews] Get total number';
}

export class GetReviewsUserCount {
  static readonly type = '[Reviews] Get total number by user_id';
  constructor(public user_id: number) {}
}

export class RemoveReview {
  static readonly type = '[Reviews] Remove';
  constructor(public user_id: number,public movie_id: number) {}
}
export class InsertReview {
  static readonly type = '[Reviews] Insert new';
  constructor(public payload: Review) { }
}
