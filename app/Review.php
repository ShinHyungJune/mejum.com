<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Review extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $fillable = ["body", "user_id", "review_id", "point"];

    protected $appends = ["img"];

    public function registerMediaCollections(Media $media = null)
    {
        $this->addMediaCollection("img")
            ->withResponsiveImages()
            ->useDisk("s3")
            ->singleFile();
    }

    public function getImgAttribute()
    {
        if($this->hasMedia('img')) {
            $media = $this->getMedia('img')[0];

            return [
                "name" => $media->file_name,
                "url" => $media->getFullUrl()
            ];
        }

        return "";
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

}
