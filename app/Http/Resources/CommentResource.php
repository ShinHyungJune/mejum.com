<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            "target_id" => $this->target->id,
            "url" => $this->url,
            "thumbnail" => $this->thumbnail,
            "nickname" => $this->nickname,
            "body" => $this->body,
            "commented_at" => $this->commented_at,
        ];
    }
}
