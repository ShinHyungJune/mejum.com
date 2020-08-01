<?php

namespace App\Http\Resources;

use Carbon\Carbon;
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
        $participants = collect();

        foreach($this->choices as $choice){
            $participants = $participants->merge($choice->users()->get());
        }

        $participantIds = $participants->pluck("id");

        $unparticipants = $this->store->group->users()->whereNotIn("id", $participantIds)->get();

        return [
            "id" => $this->id,
            "store" => StoreResource::make($this->store),
            "title" => $this->title,
            "choices" => new ChoiceCollection($this->choices),
            "unparticipants" => new UserCollection($unparticipants),
            "participants" => new UserCollection($participants),
            "invitation" => $this->invitation,
            "finished_at" => $this->finished_at,
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}
