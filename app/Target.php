<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Target extends Model
{
    use SoftDeletes;

    protected $fillable = ["idx", "platform", "url", "title", "body", "thumbnail", "state"];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function excelFiles()
    {
        return $this->hasMany(ExcelFile::class);
    }
}
