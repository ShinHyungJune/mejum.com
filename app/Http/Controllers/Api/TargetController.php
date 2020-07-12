<?php

namespace App\Http\Controllers\Api;

use App\Comment;
use App\Enums\StateType;
use App\Http\Controllers\Controller;
use App\Http\Resources\TargetCollection;
use App\Http\Resources\TargetResource;
use App\Jobs\CollectCommentsJob;
use App\Target;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TargetController extends ApiController
{
    protected $target;

    public function index(Request $request)
    {
        $targets = auth()->user()->targets()->paginate(50);

        return new TargetCollection($targets);
    }

    public function show(Request $request, $id)
    {
        $target = Target::find($id);

        if(!$target)
            return $this->respondNotFound();

        if($target->user->id != auth()->id())
            return $this->respondForbidden();

        return TargetResource::make($target);
    }

    public function store(Request $request)
    {
        $request->validate([
            "platform" => "required|string|max:500",
            "url" => "required|string|max:5000",
        ]);

        $this->target = auth()->user()->targets()->create($request->all());

        dispatch(new CollectCommentsJob($this->target, auth()->user()));

        // $this->requestVideo();

        // $this->requestComments();

        return $this->respondCreated(TargetResource::make($this->target));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "platform" => "required|string|max:500",
            "url" => "required|string|max:5000",
            "title" => "required|string|max:5000",
            "body" => "required|string|max:5000",
        ]);

        $target = Target::find($id);

        if(!$target)
            return $this->respondNotFound();

        if($target->user->id != auth()->id())
            return $this->respondForbidden();

        $target->update([
            "platform" => $request->platform,
            "url" => $request->url,
            "title" => $request->title,
            "body" => $request->body,
        ]);

        return $this->respondUpdated(TargetResource::make($target));
    }

    public function destroy(Request $request, $id)
    {
        $target = Target::find($id);

        if(!$target)
            return $this->respondNotFound();

        if($target->user->id != auth()->id())
            return $this->respondForbidden();

        $target->delete();

        return $this->respondDeleted();
    }
}
