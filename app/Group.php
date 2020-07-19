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

    public function users()
    {
        return $this->belongsToMany(User::class)->withPivot("master");
    }

    public function stores()
    {
        return $this->hasMany(Store::class);
    }
}
