<?php

namespace App\Http\Controllers\Database;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UsersController extends Controller
{
    public function getUserById(Request $request)
    {
        try {
            $user=User::where("id",$request->id)->select("name","email","created_at");
            return $user->first();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getUsersCount()
    {
        try {
            return User::all()->count();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }
}
