<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'movie_id',
        "text",
        "score",
        'date',
    ];

    public function user(){
        return $this->belongsTo(User::class,"user_id");
    }

    public function movie(){
        return $this->belongsTo(Movie::class,"movie_id");
    }

    public function movieProperty(){
        return $this->belongsTo(MovieProperty::class,"movie_id","movie_id");
    }
}
