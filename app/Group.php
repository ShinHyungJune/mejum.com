<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    protected $fillable = ["title"];

    protected $appends = ["invitation"];

    public function getInvitationAttribute()
    {
        return config("app.url")."/groups/invite/id=".encrypt($this->id);
    }
}
