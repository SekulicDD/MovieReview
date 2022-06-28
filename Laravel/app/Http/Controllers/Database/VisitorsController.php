<?php

namespace App\Http\Controllers\Database;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class VisitorsController extends Controller
{
    public function getVisitorsLastMonth(){
        try {
             return DB::table('visitors')
                ->whereDate("date", ">=", Carbon::now()->subMonth())
                ->select("date" ,DB::raw('count(*) as total'))
                ->groupBy('date')
                ->get();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }

    public function getVisitorsLastYear(){
        try {
            return Visitor::all()->groupby("date")->count();
        }
        catch (\Exception $e){
            Log::error($e->getMessage());
            abort(500);
        }
    }
}
