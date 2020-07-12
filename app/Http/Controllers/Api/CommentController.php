<?php

namespace App\Http\Controllers\Api;

use App\Comment;
use App\CommentFile;
use App\Enums\PlatformType;
use App\Exports\CommentsExport;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentCollection;
use App\Http\Resources\TargetResource;
use App\Target;
use App\TargetFile;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Excel;

class CommentController extends ApiController
{
    public function index(Request $request)
    {
        $request->validate([
            "target_id" => "required|integer",
        ]);

        $target = Target::find($request->target_id);

        if(!$target)
            return $this->respondNotFound();

        if(auth()->id() != $target->user_id)
            return $this->respondForbidden();

        $comments = $target->comments()->paginate(50);

        return new CommentCollection($comments);
    }

    public function store(Request $request)
    {
        $request->validate([
            "target_id" => "required|integer",
            "comments" => "required|array|max:500"
        ]);

        // 나중에는 수집했던 댓글은 다시 수집 못하게 하자(프론트단에서 해야됨, api 요청을 아껴야하니까)
        $target = Target::find($request->target_id);

        if(!$target)
            return $this->respondNotFound();

        DB::transaction(function () use ($request, $target){
            if($target->platform == PlatformType::YOUTUBE)
                $this->storeYoutubeComments($target, $request->comments);
        });

        return $this->respondSuccessfully();
    }

    public function storeYoutubeComments($target, $comments)
    {
        $createdComments = [];

        foreach($comments as $comment){
            $createdComments[] = Comment::updateOrCreate([
                "idx" => $comment["idx"]
            ], [
                "idx" => $comment["idx"],
                "target_id" => $target->id,
                "comment_id" => $this->getReplyId($createdComments, $comment),
                "url" => $comment["url"],
                "thumbnail" => $comment["thumbnail"],
                "nickname" => $comment["nickname"],
                "body" => $comment["body"],
                "next_page_token" => $comment["next_page_token"],
                "commented_at" => Carbon::make($comment["commented_at"])->format("Y-m-d H:i:s"),
            ]);
        }

        return $createdComments;
    }

    public function getReplyId($createdComments, $comment)
    {
        $count = count($createdComments);

        if($count < 1)
            return null;

        $latestComment = $createdComments[$count-1];

        // 최근에 수집한 댓글의 id와 부모 댓글 id가 일치할 때
        if($latestComment["idx"] == $comment["comment_idx"])
            return $latestComment["id"];

        return null;
    }
}
