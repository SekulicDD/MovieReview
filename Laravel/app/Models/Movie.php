<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    use HasFactory;

    public function movieProperties()
    {
        return $this->hasOne(MovieProperty::class);
    }

    public function  categories(){
        return $this->belongsToMany(Category::class,"movie_categories");
    }

    public function  reviews(){
        return $this->hasMany(Review::class,"movie_id");
    }

    public function  favorites(){
        return $this->hasMany(Favourite::class,"movie_id");
    }
}
