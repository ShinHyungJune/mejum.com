<?php

namespace App\Http\Controllers\Api;

use App\Choice;
use App\ChoiceUser;
use App\Http\Controllers\Controller;
use App\Http\Resources\VoteResource;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChoiceController extends ApiController
{
    public function store(Request $request)
    {
        $request->validate([
            "choice_id" => "required|integer"
        ]);

        $choice = Choice::find($request->choice_id);

        if(!$choice)
            return $this->respondNotFound();

        if(!$choice->vote->store->group->users()->find(auth()->id()))
            return $this->respondUnauthenticated();

        /*
        if($choice->vote->finished_at < Carbon::now())
            return $this->respondForbidden("투표 기간이 지났습니다.");
        */

        foreach($choice->vote->choices as $choiceData){
            ChoiceUser::where("user_id", auth()->id())->where("choice_id", $choiceData->id)->delete();
        }

        $choice->users()->attach(auth()->id());

        return $this->respondCreated(VoteResource::make($choice->vote), "성공적으로 투표되었습니다.");
    }
}
