<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class reviews_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    private $users = [1,1,1,2,2,2];
    private $movies = [1,2,3,1,2,3];
    private $scores = [4,3,5,3,2,4];
    private $text=["Great movie!",
        "Would reccomend","It's-a very nice.",
        "Testing reviews","I did not like it!","Good stuff."];

    public function run()
    {
        for ($i = 0; $i < count($this->users); $i++) {
            DB::table('reviews')->insert([
                'user_id' => $this->users[$i],
                'movie_id' => $this->movies[$i],
                'score' => $this->scores[$i],
                'text' => $this->text[$i],
                'created_at'=>now()
            ]);
        }
    }
}
