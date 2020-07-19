<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{
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
            "closed" => $this->closed,
            "secret" => $this->secret,
            "group_id" => $this->group_id,
            "user_id" => $this->user_id,
            "menus" => $this->menus,
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}
