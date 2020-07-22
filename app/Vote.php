<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ["store_id", "title", "finished_at"];

    public function choices()
    {
        return $this->hasMany(Choice::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}

