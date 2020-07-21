<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\StoreCollection;
use App\Http\Resources\StoreResource;
use App\Store;
use Illuminate\Http\Request;

class StoreController extends ApiController
{
    public function index(Request $request)
    {
        $request->validate([
            "group_id" => "required|integer",
            "word" => "nullable|string|max:500",
        ]);

        $group = auth()->user()->groups()->find($request->group_id);

        if(!$group)
            return $this->respondNotFound();

        $stores = $group->stores();

        if($request->word)
            $stores->whereHas("menus", function($query) use ($request){
                $query->where("title", "like", "%".$request->word."%");
            })->orWhere("title", "like", "%".$request->word."%");

        $stores = $stores->paginate(50);

        return new StoreCollection($stores);
    }

    public function store(Request $request)
    {
        $request->validate([
            "img" => "nullable|image|max:61440",
            "group_id" => "required|integer",
            "title" => "required|string|max:500",
            "contact" => "required|string|max:500",
            "address" => "required|string|max:1000",
            "address_detail" => "required|string|max:1000",
            "park" => "required|boolean",
            "closed" => "required|array|max:500",
            "secret" => "nullable|boolean",
            "menus" => "required|array|max:100",
            "menus.*.title" => "required|string|max:500",
            "menus.*.body" => "required|string|max:500",
            "menus.*.price" => "required|integer|min:0",
        ]);

        $group = auth()->user()->groups()->find($request->group_id);

        if(!$group)
            return $this->respondNotFound();

        $request["closed"] = json_encode($request->closed);

        $store = auth()->user()->stores()->create($request->all());

        if($request->img)
            $store->addMedia($request->img)->toMediaCollection("img", "s3");

        foreach($request->menus as $menu){
            $store->menus()->create($menu);
        }

        return $this->respondCreated(StoreResource::make($store));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "img" => "nullable|image|max:61440",
            "group_id" => "required|integer",
            "title" => "required|string|max:500",
            "contact" => "required|string|max:500",
            "address" => "required|string|max:1000",
            "address_detail" => "required|string|max:1000",
            "park" => "required|boolean",
            "closed" => "required|array|max:500",
            "secret" => "nullable|boolean",
            "menus" => "required|array|max:100",
            "menus.*.title" => "required|string|max:500",
            "menus.*.body" => "nullable|string|max:500",
            "menus.*.price" => "required|integer|min:0",
        ]);

        $store = Store::find($id);

        if(!$store)
            return $this->respondNotFound();

        $user = $store->group->users()->find(auth()->id());

        if(!$user)
            return $this->respondUnauthenticated();

        if(!$user->pivot->master && $store->user_id != auth()->id())
            return $this->respondUnauthenticated();

        $request["closed"] = json_encode($request->closed);

        $store->update($request->all());

        if($request->img)
            $store->addMedia($request->img)->toMediaCollection("img", "s3");

        foreach($request->menus as $menu){
            $store->menus()->updateOrCreate([
                "title" => $menu["title"]
            ], $menu);
        }

        return $this->respondUpdated(StoreResource::make($store));
    }

    public function destroy($id)
    {
        $store = Store::find($id);

        if(!$store)
            return $this->respondNotFound();

        $user = $store->group->users()->find(auth()->id());

        if(!$user)
            return $this->respondUnauthenticated();

        if(!$user->pivot->master && $store->user_id != auth()->id())
            return $this->respondUnauthenticated();

        $store->delete();

        return $this->respondDeleted();
    }
}