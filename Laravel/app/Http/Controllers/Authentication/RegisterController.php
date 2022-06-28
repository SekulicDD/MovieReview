<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use function abort;

class RegisterController extends Controller
{
    public function register(Request $request){

        $email=$request->input("email");

         $request->validate([
            "name"=>"required",
            "email"=>"required|email",
            "password"=>"required",
            "confPassword"=>"required",
        ]);


        if(strcmp($request->password,$request->confPassword)!=0)
            return ["error"=>"Passwords do not match"];

        try {
            $emailTest=User::where("email",$email)->first();

            if($emailTest!=null){
                return ["error"=>"Email is already taken!"];
            }

            $user=User::create($request->except("password") + ["password"=>Hash::make($request->password)]);


            Log::info("New user registered with email:" .$user->email);
            return ["success"=>"Registered successfully"];
        }
        catch (ValidationException $e){
            abort(400);
            return ["error"=>$e->getMessage()];
        }

        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }
}
