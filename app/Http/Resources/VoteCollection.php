<?php

namespace App\Http\Resources;

use App\Vote;
use Illuminate\Http\Resources\Json\ResourceCollection;

class VoteCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public $collects = VoteResource::class;

    public function toArray($request)
    {
        return [
            "data" => $this->collection
        ];
    }
}
