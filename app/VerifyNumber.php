<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VerifyNumber extends Model
{
    protected $fillable = ["phone", "number", "verified"];
}
