<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupResouce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $members = [];

        foreach($this->users as $user){
            $members[] = [
                "id" => $user->id,
                "name" => $user->name,
                "img" => $user->img,
                "master" => $user->pivot->master
            ];
        }

        return [
            "id" => $this->id,
            "title" => $this->title,
            "invitation" => $this->invitation,
            "users" => $members,
            "created_at" => Carbon::make($this->created_at)->format("Y-m-d H:i:s")
        ];
    }
}
