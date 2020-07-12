<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class TargetResource extends JsonResource
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
            "idx" => $this->idx,
            "platform" => $this->platform,
            "url" => $this->url,
            "title" => $this->title,
            "body" => $this->body,
            "thumbnail" => $this->thumbnail,
            "state" => $this->state,
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}
