<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = ['id', 'title', 'author', 'published_year', 'genre', 'description'];
    use HasFactory;
}
