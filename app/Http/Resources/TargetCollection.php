<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class TargetCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public $collects = TargetResource::class;

    public function toArray($request)
    {
        return [
            "data" => $this->collection
        ];
    }
}
