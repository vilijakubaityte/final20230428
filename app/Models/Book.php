<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function scopeFilter(Builder $query, $filter)
    {
        if ($filter->title!=null){
            $query->where("title", "like", "%$filter->title%");
        }
    }

}
