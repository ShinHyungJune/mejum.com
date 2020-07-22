<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Choice extends Model
{
    protected $fillable = ["title", "menu_id", "vote_id"];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function vote()
    {
        return $this->belongsTo(Vote::class);
    }
}
