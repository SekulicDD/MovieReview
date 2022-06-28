<?php

namespace App\Http\Controllers\Database;


use App\Http\Controllers\BaseController;
use App\Models\Movie;
use App\Models\MovieCategory;
use App\Models\MovieProperty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use function abort;

class MoviesController extends BaseController
{
    public function getMovie(Request $request){
        try {
            $movie=Movie::with("categories")->with("movieProperties")->where("id",$request->id)->first();
            return $movie;
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getMovies(Request $request){
        $order="score";
        $direction="desc";
        $perPage=8;

        if($request->order!=null){
            switch ($request->order){
                case "1": $order="score"; $direction="desc"; break;
                case "2": $order="score"; $direction="asc"; break;
                case "3": $order="title"; $direction="asc"; break;
                case "4": $order="title"; $direction="desc"; break;
            }
        }

        try {
            $query=Movie::query()->with("categories")->with("MovieProperties");

            if ($request->catIds != null) {
                $categoryIds=explode(',',$request->catIds);
                $query=$query->whereHas("categories",function ($subQuery) use ($categoryIds){
                    $subQuery->whereIn('id', $categoryIds);
                });
            }

            if($request->search!=null ) {
                $word=$request->search;
                $query=$query->where("title","like","%".$word."%");
            }

            $movies=$query->orderBy($order, $direction)->paginate( $perPage);
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }

        return $movies;
    }

    public function getTopMovies(Request $request){
        try {
            $movies=Movie::with("MovieProperties")
                ->orderBy("score","desc")->limit($request->movieNumber);
            return $movies->get();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getRecentMovies(Request $request){
        try {
            $movies=Movie::with("MovieProperties")
                ->orderBy("releaseDate","desc")->limit($request->movieNumber);
            return $movies->get();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getMoviesCount(){
        try {
            return Movie::all()->count();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function postMovie(Request $request){
        try {

            $movie=new Movie();
            $movie->title = $request->title;
            $movie->duration = $request->duration;
            $movie->releaseDate = $request->releaseDate;
            $movie->summary = $request->summary;

            $movieProperties=new MovieProperty();
            $movieProperties->videoLoc=$request->videoUrl;

            $request->validate([
                'title' => ['required', 'min:3'],
                'duration' => ['required'],
                'releaseDate' => ['required'],
                'summary' => ['required'],
                'videoUrl' => ['required'],
            ]);

            if ($request->hasFile('fileSource')) {
                $fileName=$request->file('fileSource')->hashName();
                Storage::disk('local')->put($fileName,$request->file('fileSource')->get());
                $movieProperties->imageLoc = "http://127.0.0.1:8000/api/images/".$fileName;
                $movieProperties->imageName = $fileName;
            }
            else{
                return response()->json('Image is required',400);
            }

            $movie->save();

            $categories=explode (",",$request->categories);
            if(count($categories)<1){
                return response()->json('At least one category is required',400);
            }
            foreach ($categories as $cat){
               $movieCat=new MovieCategory([
                    "movie_id"=>$movie->id,
                    "category_id"=>$cat
                ]);
                $movieCat->save();
            }

            $movieProperties->movie_id=$movie->id;
            $movieProperties->save();

            $movie=Movie::where('id',$movie->id)->with("MovieProperties")->with("categories")->first();
            return $movie;
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

}
