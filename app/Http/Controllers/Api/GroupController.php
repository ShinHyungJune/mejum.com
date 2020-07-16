<?php

namespace App\Http\Controllers\Api;

use App\Group;
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

    public function update(Request $request, $id)
    {
        $request->validate([
            "title" => "required|string|max:500"
        ]);

        $group = auth()->user()->groups()->find($id);

        if(!$group)
            return $this->respondNotFound();

        $group->update(["title" => $request->title]);

        return $this->respondUpdated(GroupResouce::make($group));
    }

    public function destroy($id)
    {
        $group = auth()->user()->groups()->find($id);

        if(!$group)
            return $this->respondNotFound();

        auth()->user()->groups()->detach($id);

        if(auth()->user()->groups()->count() == 0)
            $group->delete();

        return $this->respondDeleted(null, "그룹에서 탈퇴하였습니다.");
    }
}
