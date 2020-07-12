<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ExcelFileCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */

    public $collects = ExcelFileResource::class;

    public function toArray($request)
    {
        return [
            "data" => $this->collection
        ];
    }
}
