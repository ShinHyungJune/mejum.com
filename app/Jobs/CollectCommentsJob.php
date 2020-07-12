<?php

namespace App\Jobs;

use App\Comment;
use App\Enums\StateType;
use App\SMS;
use App\Target;
use App\User;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CollectCommentsJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $target;

    protected $user;

    protected $comments = [];
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Target $target, User $user)
    {
        $this->target = $target;

        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $this->requestVideo();

            $this->requestComments();

            $this->target->update([
                "state" => StateType::SUCCESS
            ]);
        }catch(\Exception $exception){
            Log::error($exception);

            $this->target->update([
                "state" => StateType::FAIL
            ]);
        }
    }

    public function getYoutubeVideoId($url)
    {
        preg_match("#(?<=v=)[a-zA-Z0-9-]+(?=&)|(?<=v\/)[^&\n]+(?=\?)|(?<=v=)[^&\n]+|(?<=youtu.be/)[^&\n]+#", $url, $matches);

        return $matches[0];
    }

    public function requestVideo()
    {
        $response = Http::get(config("services.google.domain")."/videos", [
            "id" => $this->getYoutubeVideoId($this->target->url),
            "part" => "snippet",
            "key" => config("services.google.key")
        ]);

        $video = $response->json()["items"][0];

        $this->target->update([
            "idx" => $video["id"],
            "title" => $video["snippet"]["title"],
            "body" => $video["snippet"]["description"],
            "thumbnail" => $video["snippet"]["thumbnails"]["default"]["url"],
        ]);
    }

    public function requestComments($pageToken = null)
    {
        $replies = [];

        $response = Http::get(config("services.google.domain")."/commentThreads", [
            "part" => "snippet, replies",
            "key" => config("services.google.key"),
            "maxResults" => 100,
            "order" => "time",
            "videoId" => $this->target->idx,
            "pageToken" => $pageToken
        ]);

        $pageToken = array_key_exists("nextPageToken", $response->json()) ? $response->json()["nextPageToken"] : null;

        $items = $response->json()["items"];

        foreach($items as $item){
            if(array_key_exists("replies", $item)){
                foreach($item["replies"]["comments"] as $reply){
                    $replies[] = [
                        "idx" => $reply["id"],
                        "target_id" => $this->target->id,
                        "nickname" => $reply["snippet"]["authorDisplayName"],
                        "url" => $reply["snippet"]["authorChannelUrl"],
                        "thumbnail" => $reply["snippet"]["authorProfileImageUrl"],
                        "commented_at" => Carbon::make($reply["snippet"]["publishedAt"]),
                        "body" => $reply["snippet"]["textOriginal"],
                        "next_page_token" => $pageToken,
                        "comment_idx" => $item["id"]
                    ];
                }
            }

            $this->comments[] = [
                "idx" => $item["id"],
                "target_id" => $this->target->id,
                "nickname" => $item["snippet"]["topLevelComment"]["snippet"]["authorDisplayName"],
                "url" => $item["snippet"]["topLevelComment"]["snippet"]["authorChannelUrl"],
                "thumbnail" => $item["snippet"]["topLevelComment"]["snippet"]["authorProfileImageUrl"],
                "commented_at" => Carbon::make($item["snippet"]["topLevelComment"]["snippet"]["publishedAt"]),
                "comment_idx" => null,
                "body" => $item["snippet"]["topLevelComment"]["snippet"]["textOriginal"],
                "next_page_token" => $pageToken
            ];
        }

        $this->comments = array_merge($this->comments, $replies);

        if($pageToken)
            return $this->requestComments($pageToken);


        foreach(array_chunk($this->comments, 1000) as $comments){
            Comment::insert($comments);
        }

        $sms = new SMS();

        return $sms->send($this->user->phone, substr($this->target->title,0,25)."...의 댓글 수집이 완료되었습니다.");
    }
}
