<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class categories_seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    private $categories=["Action","Adventure","Animation","Comedy","Crime","Drama","Fantasy","Horror","Musical","Romance","Thriller","Sci-Fi"];

    public function run()
    {
        for ($i = 0; $i < count($this->categories); $i++) {
            DB::table('categories')->insert([
                'name' => $this->categories[$i],
            ]);
        }
    }
}
