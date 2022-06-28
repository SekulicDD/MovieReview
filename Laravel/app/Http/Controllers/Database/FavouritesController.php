<?php

namespace App\Http\Controllers\Database;

use App\Http\Controllers\Controller;
use App\Models\Favourite;
use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FavouritesController extends Controller
{
    public function getFavouritesByUserId(Request $request){
        try {
            $favourites=Favourite::where("user_id",$request->id)->select("movie_id")->get();
            $movies=Movie::whereIn("id",$favourites)->with("MovieProperties");
            return $movies->paginate(4);
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getFavouritesUser(Request $request){
        try {
            $favourites=Favourite::where("user_id",$request->userId)->get();
            return $favourites;
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function removeFavourites(Request $request){
        try {
            Favourite::where("user_id",$request->user_id)
                ->where("movie_id",$request->movie_id)->delete();
            return response()->json('Successfully removed from favourites!');
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function insertFavourite(Request $request){
        try {
            $check=Favourite::where("movie_id",$request->movie_id)
                ->where("user_id",$request->user_id)->first();
            if($check){
                return response()->json('Item already exists in favourites!',405);
            }

            $favourite=new Favourite([
               "user_id" => $request->user_id,
                "movie_id" =>$request->movie_id,
            ]);
            $favourite->save();

            $movie=Movie::where("id",$request->movie_id)->with("MovieProperties")->first();

            return ["fav"=>$favourite,"movie"=>$movie];
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }


}
