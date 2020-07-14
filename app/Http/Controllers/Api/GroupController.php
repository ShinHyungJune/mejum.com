<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\GroupCollection;
use App\Http\Resources\GroupResouce;
use Illuminate\Http\Request;

class GroupController extends ApiController
{
    public function index()
    {
        $groups = auth()->user()->groups()->orderBy("created_at", "desc")->get();

        return new GroupCollection($groups);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => "required|string|max:500"
        ]);

        $group = auth()->user()->groups()->create($request->all());

        return $this->respondCreated(GroupResouce::make($group));
    }
}
