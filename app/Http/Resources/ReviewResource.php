<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
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
            "store_id" => $this->store->id,
            "user" => UserResource::make($this->user),
            "point" => $this->point,
            "body" => $this->body,
            "img" => $this->img,
            "updated_at" => Carbon::make($this->updated_at)->format("Y-m-d"),
        ];
    }
}
