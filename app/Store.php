<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\HasMedia\HasMedia;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\Models\Media;

class Store extends Model implements HasMedia
{
    use HasMediaTrait, SoftDeletes;

    protected $fillable = ["title", "contact", "address", "park", "memo", "secret", "group_id", "user_id"];

    protected $appends = ["img"];

    public function registerMediaCollections(Media $media = null)
    {
        // 단일 이미지 파일이어야만 할 경우에는 끝에 singleFile() 추가
        $this->addMediaCollection("img")->useDisk("s3")->singleFile();
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

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
}
