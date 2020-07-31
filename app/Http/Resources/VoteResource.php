<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $participantCount = 0;

        foreach($this->choices as $choice){
            $participantCount += $choice->users()->count();
        }

        return [
            "id" => $this->id,
            "store" => StoreResource::make($this->store),
            "title" => $this->title,
            "choices" => new ChoiceCollection($this->choices),
            "totalCount" => $this->store->group->users()->count(),
            "participantCount" => $participantCount,
            "finished_at" => $this->finished_at,
            "created_at" => $this->created_at
        ];
    }
}
