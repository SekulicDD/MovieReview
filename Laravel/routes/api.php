<?php

use App\Http\Controllers\Database;
use App\Http\Controllers\Authentication;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/


Route::name('front')->middleware('visitor')->group(function() {
    //movies
    Route::get('/movie/{id?}', [Database\MoviesController::class, 'getMovie']);
    Route::get('/movies/{page?}/{catIds?}/{order?}/{search?}', [Database\MoviesController::class, 'getMovies']);
    Route::get('/movies-top/{movieNumber?}', [Database\MoviesController::class, 'getTopMovies']);
    Route::get('/movies-recent/{movieNumber?}', [Database\MoviesController::class, 'getRecentMovies']);
    Route::get('/movies-count', [Database\MoviesController::class, 'getMoviesCount']);

//reviews
    Route::get('/reviews-movie/{page?}/{movieId?}', [Database\ReviewsController::class, 'getReviewsByMovie']);
    Route::get('/reviews-user/{page?}/{userId?}', [Database\ReviewsController::class, 'getReviewsByUserId']);
    Route::get('/reviews-user-movie/{userId?/{movieId?}', [Database\ReviewsController::class, 'getReviewUserMovie']);
    Route::get('/reviews-recent/{reviewNumber?}', [Database\ReviewsController::class, 'getRecentReviews']);
    Route::get('/reviews-count', [Database\ReviewsController::class, 'getReviewsCount']);
    Route::get('/reviews-user-count/{userId?}', [Database\ReviewsController::class, 'getUserReviewCount']);
//favourites
    Route::get('/favourites/{page?}/{id?}', [Database\FavouritesController::class, 'getFavouritesByUserId']);
    Route::get('/favourites-all/{userId?}', [Database\FavouritesController::class, 'getFavouritesUser']);

//categories
    Route::get('/categories', [Database\CategoriesController::class, 'getCategories']);

//users
    Route::get('/user/{id?}', [Database\UsersController::class, 'getUserById']);
    Route::get('/users-count', [Database\UsersController::class, 'getUsersCount']);

//visitors
    Route::get('/visitors-month', [Database\VisitorsController::class, 'getVisitorsLastMonth']);
    Route::get('/visitors-year', [Database\VisitorsController::class, 'getVisitorsLastYear']);

//uploaded images
    Route::get('images/{filename}', function ($filename)
    {
        $file = \Illuminate\Support\Facades\Storage::get($filename);
        return response($file, 200)->header('Content-Type', 'image/jpeg');
    });

});


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [Authentication\AuthController::class, 'login']);
    Route::post('/register', [Authentication\AuthController::class, 'register']);
    Route::post('/logout', [Authentication\AuthController::class, 'logout']);
    Route::post('/refresh', [Authentication\AuthController::class, 'refresh']);
    Route::get('/user-profile', [Authentication\AuthController::class, 'userProfile']);

    Route::post('/reset-password', [Authentication\ResetPasswordController::class, 'resetPassword']);
    Route::post('/change-password', [Authentication\ResetPasswordController::class, 'changePassword']);

    //favourites
    Route::post('/favourites-remove', [Database\FavouritesController::class, 'removeFavourites']);
    Route::post('/favourites-insert', [Database\FavouritesController::class, 'insertFavourite']);
    //reviews
    Route::post('/reviews-remove', [Database\ReviewsController::class, 'removeReviews']);
    Route::post('/reviews-insert', [Database\ReviewsController::class, 'insertReview']);
    //movies
    Route::post('/movies-insert', [Database\MoviesController::class, 'postMovie']);
});

Route::get('/resetPasswordTable/{token?}', [Database\ResetPasswordsTableController::class, 'getEmailByToken']);
