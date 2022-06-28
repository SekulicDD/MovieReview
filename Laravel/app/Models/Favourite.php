<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'movie_id',
        "created_at"
    ];

    public function movies(){
        return $this->belongsTo(Movie::class,"movie_id");
    }
}
