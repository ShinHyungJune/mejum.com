<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
    protected $withMenus = false;

    public function __construct($resource, $withMenus = false)
    {
        parent::__construct($resource);

        $this->withMenus = $withMenus;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "img" => $this->img,
            "title" => $this->title,
            "contact" => $this->contact,
            "address" => $this->address,
            "address_detail" => $this->address_detail,
            "park" => $this->park,
            "memo" => $this->memo,
            "secret" => $this->secret,
            "group_id" => $this->group_id,
            "user_id" => $this->user_id,
            "menus" => $this->withMenus ? $this->menus : [],
            "reviewsCount" => $this->reviews()->count(),
            "avg" => $this->reviews()->count() == 0 ? 0 : $this->reviews()->pluck("point")->avg(),
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}
