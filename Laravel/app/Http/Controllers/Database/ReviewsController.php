<?php

namespace App\Http\Controllers\Database;

use App\Http\Controllers\Controller;
use App\Models\Movie;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use function abort;

class ReviewsController extends Controller
{
    public function getReviewsByMovie(Request $request){
        try {
            $reviews=Review::with("user:id,name")
                ->where("movie_id",$request->id)->orderBy("created_at","desc");
            return $reviews->paginate($request->per_page);
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getReviewsByUserId(Request $request){
        try {
            $reviews=Review::where("user_id",$request->id)->with("movieProperty");
            return $reviews->paginate(4);
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getReviewUserMovie(Request $request){
        try {
            $review=Review::where("user_id",$request->userId)->where("movie_id",$request->movieId);
            return $review->first();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getRecentReviews(Request $request){
        try {
            $reviews=Review::with("movieProperty")->with("user:id,name")
                ->orderBy("created_at","desc")->limit($request->reviewNumber);
            return $reviews->get();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getReviewsCount(){
        try {
            return Review::all()->count();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getUserReviewCount(Request $request){
        try {

            return Review::where("user_id",$request->userId)->count();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function removeReviews(Request $request){
        try {
           Review::where("user_id",$request->user_id)
                ->where("movie_id",$request->movie_id)->delete();

            $movie=Movie::where("id", $request->movie_id)->first();
            $movie->score=Review::where("movie_id",$request->movie_id)->avg("score");;
            $movie->save();

            return response()->json(['message' => 'Successfully removed from favourites']);
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function insertReview(Request $request){
        try {
            $review=new Review([
                "user_id" => $request->user_id,
                "movie_id" => $request->movie_id,
                "score"=>$request->score,
                "text"=>$request->text,
                "created_at"=>now()
            ]);
            $review->save();

            $movie=Movie::where("id", $request->movie_id)->first();
            $movie->score=Review::where("movie_id",$request->movie_id)->avg("score");;
            $movie->save();

            $returnValue=$review;
            $returnValue->user=User::where("id",$request->user_id)->first();
            return $returnValue;
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

}
