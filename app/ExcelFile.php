<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ExcelFile extends Model
{
    protected $fillable = ["user_id", "target_id", "filename", "disk", "state"];

    public function target()
    {
        return $this->belongsTo(Target::class);
    }
}
