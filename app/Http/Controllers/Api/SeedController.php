<?php

namespace App\Http\Controllers\Api;

use App\Group;
use App\Http\Controllers\Controller;
use App\Menu;
use App\Store;
use App\User;
use Illuminate\Http\Request;

class SeedController extends ApiController
{
    public function saveUser(Request $request)
    {
        User::create([
            "name" => $request->name,
            "phone" => $request->phone,
            "verified_at" => $request->verified_at,
            "password" => $request->password,
        ]);
    }

    public function saveStore(Request $request)
    {
        $user = User::first();

        $group = Group::where("title", "임팩시스")->first();

        Store::create([
            "group_id" => $group->id,
            "user_id" => $user->id,
            "title" => $request->title,
            "contact" => $request->contact,
            "address" => $request->address,
            "park" => $request->park,
        ]);
    }

    public function menus(Request $request)
    {
        // title을 받기
        $store = Store::where("title", $request->title)->first();

        $store->menus()->create([
            "title" => $request->title,
            "price" => $request->price
        ]);
    }
}
