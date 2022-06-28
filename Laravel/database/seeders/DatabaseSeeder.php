<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            roles_seeder::class,
            users_seeder::class,
            categories_seeder::class,
            movies_seeder::class,
            reviews_seeder::class
        ]);
    }
}
