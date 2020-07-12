<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Comment extends Model
{
    use SoftDeletes;

    protected $fillable = ["target_id", "comment_idx", "idx", "url", "thumbnail","nickname", "body", "next_page_token", "commented_at"];

    public function target()
    {
        return $this->belongsTo(Target::class);
    }
}
