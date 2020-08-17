<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewCollection;
use App\Http\Resources\ReviewResource;
use App\Review;
use App\Store;
use Illuminate\Http\Request;

class ReviewController extends ApiController
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
            return $this->respondForbidden();

        $orderBy = $request->orderBy ?? "updated_at";

        $align = $request->align ?? "desc";

        $reviews = $store->reviews()->orderBy($orderBy, $align)->paginate(50);

        return new ReviewCollection($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            "img" => "nullable|image|max:61440",
            "store_id" => "required|integer",
            "body" => "required|string|max:5000",
            "point" => "required|integer|min:0|max:5"
        ]);

        $store = Store::find($request->store_id);

        if(!$store)
            return $this->respondNotFound();

        if(!$store->group->users()->find(auth()->id()))
            return $this->respondForbidden();

        $review = $store->reviews()->create([
            "user_id" => auth()->id(),
            "body" => $request->body,
            "point" => $request->point
        ]);

        if($request->img)
            $review->addMedia($request->img)->toMediaCollection("img", "s3");

        return $this->respondCreated(ReviewResource::make($review));
    }

    public function show($id)
    {
        $review = Review::find($id);

        if(!$review)
            return $this->respondNotFound();

        return $this->respond(ReviewResource::make($review));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            "img" => "nullable|image|max:61440",
            "body" => "required|string|max:5000",
            "point" => "required|integer|min:0|max:5"
        ]);

        $review = Review::find($id);

        if(!$review)
            return $this->respondNotFound();

        if($review->user->id != auth()->id())
            return $this->respondForbidden();

        $review->update($request->all());

        if($request->img)
            $review->addMedia($request->img)->toMediaCollection("img", "s3");

        return $this->respondUpdated(ReviewResource::make($review));
    }

    public function destroy($id)
    {
        $review = Review::find($id);

        if(!$review)
            return $this->respondNotFound();

        if($review->user->id != auth()->id())
            return $this->respondForbidden();

        $review->delete();

        return $this->respondDeleted();
    }
}
