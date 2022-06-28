<?php

namespace App\Http\Controllers\Database;

use App\Http\Controllers\Controller;
use App\Models\ResetPassword;
use Illuminate\Http\Request;

class ResetPasswordsTableController extends Controller
{
    public function getEmailByToken(Request $request){
        $email=ResetPassword::where("token", $request->token)->select("email")->first();
        return $email;
    }
}
