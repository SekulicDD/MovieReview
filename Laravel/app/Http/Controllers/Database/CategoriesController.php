<?php

namespace App\Http\Controllers\Database;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Support\Facades\Log;
use function abort;

class CategoriesController extends Controller
{
    public function getCategories(){
        try {
            $categories=Category::all();
            return $categories;
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }
}
