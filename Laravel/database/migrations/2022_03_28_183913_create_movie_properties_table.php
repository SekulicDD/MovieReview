<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movie_properties', function (Blueprint $table) {
            $table->foreignId("movie_id")->references("id")->on("movies");
            $table->primary("movie_id");
            $table->string("imageLoc");
            $table->string("imageName");
            $table->string("videoLoc");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movie_properties');
    }
};
