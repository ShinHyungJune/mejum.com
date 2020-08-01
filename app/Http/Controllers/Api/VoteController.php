<?php

namespace App\Http\Controllers\Api;

use App\Choice;
use App\Group;
use App\Http\Controllers\Controller;
use App\Http\Resources\VoteCollection;
use App\Http\Resources\VoteResource;
use App\Store;
use App\Vote;
use Illuminate\Http\Request;

class VoteController extends ApiController
{
    public function index(Request $request)
    {
        $votes = auth()->user()->votes()->orderBy("created_at", 'desc')->paginate(50);

        return $this->respond(new VoteCollection($votes));
    }

    public function show(Request $request, $id)
    {
        $vote = Vote::find($id);

        if(!$vote)
            return $this->respondNotFound();

        if(!$vote->store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        return $this->respond(VoteResource::make($vote));
    }

    public function store(Request $request)
    {
        $request->validate([
            "store_id" => "required|integer",
            "finished_at" => "nullable|string|max:500",
            "choices" => "nullable|array|min:1|max:100",
            /* "choices.*.menu_id" => "nullable|integer",
            "choices.*.title" => "required|string|max:500",*/
        ]);

        $store = Store::find($request->store_id);

        if(!$store)
            return $this->respondNotFound();

        if(!$store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        $request["title"] = $store->title;

        $vote = $store->votes()->create($request->all());

        $vote->users()->attach($store->group->users()->pluck("id"));

        /*// 메뉴 추가
        foreach($store->menus as $menu){
            $vote->choices()->create([
                "title" => $menu->title." - ".$menu->price,
                "menu_id" => $menu->id
            ]);
        }*/

        if($request->choices){
            foreach($request->choices as $choice){
                $vote->choices()->create([
                    "title" => $choice
                ]);
            }
        }

        return $this->respondCreated(VoteResource::make($vote));
    }

    public function join(Request $request)
    {
        $request->validate([
            "id" => "required"
        ]);

        $id = decrypt($request->id);

        $vote = Vote::find($id);

        if(!$vote)
            return $this->respondNotFound();

        if(!auth()->user()->groups()->find($vote->store->group->id)) {
            auth()->user()->groups()->attach($vote->store->group->id);

            $vote->users()->attach(auth()->id());
        }

        return $this->respondSuccessfully(VoteResource::make($vote), "성공적으로 가입되었습니다.");
    }
}
