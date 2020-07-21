<?php

namespace App\Http\Controllers\Api;

use App\Choice;
use App\Group;
use App\Http\Controllers\Controller;
use App\Http\Resources\VoteResource;
use App\Store;
use App\Vote;
use Illuminate\Http\Request;

class VoteController extends ApiController
{
    public function store(Request $request)
    {
        $request->validate([
            "store_id" => "required|integer",
            "finished_at" => "required|string|max:500",
            "choices" => "nullable|array|max:100",
            "choices.*.menu_id" => "nullable|integer",
            "choices.*.title" => "required|string|max:500",
        ]);

        $store = Store::find($request->store_id);

        if(!$store)
            return $this->respondNotFound();

        if(!$store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        $request["title"] = $store->title;

        $vote = $store->votes()->create($request->all());

        auth()->users()->votes()->attach($vote-);

        // 메뉴 추가
        foreach($store->menus as $menu){
            $vote->choices()->create([
                "title" => $menu->title." - ".$menu->price,
                "menu_id" => $menu->id
            ]);
        }

        if($request->choices){
            foreach($request->choices as $choice){
                $vote->choices()->create($choice);
            }
        }

        return $this->respondCreated(VoteResource::make($vote));
    }
}
