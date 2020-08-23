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

        $group = auth()->user()->groups()->create([
            "title" => $request->title
        ]);

        auth()->user()->groups()->updateExistingPivot($group->id, ["master" => true]);

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

    public function show(Request $request, $id)
    {
        $group = auth()->user()->groups()->find($id);

        if(!$group)
            return $this->respondNotFound();


        return $this->respond(GroupResouce::make($group));
    }

    public function destroy($id)
    {
        $group = auth()->user()->groups()->find($id);

        if(!$group)
            return $this->respondNotFound();

        auth()->user()->groups()->detach($id);

        foreach($group->stores as $store){
            foreach($store->votes as $vote){
                $vote->users()->detach($id);
            }
        }

        if(auth()->user()->groups()->count() == 0)
            $group->delete();

        return $this->respondDeleted(null, "그룹에서 탈퇴하였습니다.");
    }

    public function join(Request $request)
    {
        $request->validate([
            "id" => "required"
        ]);

        $id = decrypt($request->id);

        $group = Group::find($id);

        if(!$group)
            return $this->respondNotFound();

        if(!auth()->user()->groups()->find($group->id))
            auth()->user()->groups()->attach($group->id);

        return $this->respondSuccessfully(GroupResouce::make($group), "성공적으로 가입되었습니다.");
    }

    public function banish(Request $request)
    {
        $request->validate([
            "user_id" => "required",
            "group_id" => "required"
        ]);

        $group = Group::find($request->group_id);

        if(!$group)
            return $this->respondNotFound();

        if(!$group->users()->find(auth()->id())->pivot->master)
            return $this->respondForbidden("권한이 없습니다.");

        $user = $group->users()->find($request->user_id);

        if(!$user)
            return $this->respondNotFound("해당 사용자는 그룹에 소속되어 있지 않습니다.");

        if($user->pivot->master)
            return $this->respondNotFound("그룹장은 내보낼 수 없습니다.");

        $group->users()->detach($user);

        foreach($group->stores as $store){
            foreach($store->votes as $vote){
                $vote->users()->detach($user);
            }
        }

        return $this->respondSuccessfully(null, "성공적으로 내보냈습니다.");
    }

    public function appoint(Request $request)
    {
        $request->validate([
            "user_id" => "required",
            "group_id" => "required"
        ]);

        $group = Group::find($request->group_id);

        if(!$group)
            return $this->respondNotFound();

        if(!$group->users()->find(auth()->id())->pivot->master)
            return $this->respondForbidden("권한이 없습니다.");

        $user = $group->users()->find($request->user_id);

        if(!$user)
            return $this->respondNotFound("해당 사용자는 그룹에 소속되어 있지 않습니다.");

        if($user->pivot->master)
            return $this->respondNotFound("이미 그룹장입니다.");

        $group->users()->updateExistingPivot($user->id, ["master" => true]);

        $group->users()->updateExistingPivot(auth()->id(), ["master" => false]);

        return $this->respondSuccessfully(GroupResouce::make($group), "성공적으로 위임하였습니다.");
    }
}
