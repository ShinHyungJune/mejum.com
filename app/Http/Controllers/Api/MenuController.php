<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MenuCollection;
use App\Http\Resources\MenuResource;
use App\Menu;
use App\Store;
use Illuminate\Http\Request;

class MenuController extends ApiController
{
    public function index(Request $request)
    {
        $request->validate([
            "store_id" => "required|integer"
        ]);

        $store = Store::find($request->store_id);

        if(!$store)
            return $this->respondNotFound();

        if(!$store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        $menus = $store->menus;

        return $this->respond(new MenuCollection($menus));
    }

    public function store(Request $request)
    {
        $maxMenuCount = 50;

        $request->validate([
            "store_id" => "required|integer",
            "title" => "required|string|max:500",
            "body" => "nullable|string|max:500",
            "price" => "required|integer|min:0",
            "img" => "nullable|image|max:61440",
        ]);

        $store = Store::find($request->store_id);

        if(!$store)
            return $this->respondNotFound();

        if(!$store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        if($store->menus()->count() >= $maxMenuCount)
            return $this->respondForbidden();

        $menu = $store->menus()->create($request->all());

        if($request->img)
            $menu->addMedia($request->img)->toMediaCollection("img", "s3");

        return $this->respondCreated(MenuResource::make($menu));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "title" => "required|string|max:500",
            "body" => "nullable|string|max:500",
            "price" => "required|integer|min:0",
            "img" => "nullable|image|max:61440",
        ]);

        $menu = Menu::find($id);

        if(!$menu)
            return $this->respondNotFound();

        if(!$menu->store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        $menu->update($request->all());

        if($request->img)
            $menu->addMedia($request->img)->toMediaCollection("img", "s3");

        return $this->respondUpdated(MenuResource::make($menu));
    }

    public function destroy($id)
    {
        $menu = Menu::find($id);

        if(!$menu)
            return $this->respondNotFound();

        if(!$menu->store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        $menu->delete();

        return $this->respondDeleted();
    }
}
