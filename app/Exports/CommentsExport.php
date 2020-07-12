<?php

namespace App\Exports;

use App\Comment;
use App\Enums\StateType;
use App\ExcelFile;
use App\SMS;
use App\Target;
use App\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Events\AfterSheet;

class CommentsExport implements WithHeadings, WithMapping, FromQuery, ShouldQueue, WithEvents
{
    use Exportable;

    protected $user;

    protected $target;

    protected $excelFile;

    public function __construct(User $user, Target $target, ExcelFile $excelFile = null)
    {
        $this->user = $user;

        $this->target = $target;

        $this->excelFile = $excelFile;
    }

    public function map($comment): array
    {
        return [
            $comment->url,
            $comment->name,
            $comment->body,
            $comment->published_at,
        ];
    }

    public function headings(): array
    {
        return [
            "URL",
            "아름",
            "내용",
            "댓글일자"
        ];
    }

    public function query()
    {
        return Comment::query()->where("target_id", $this->target->id);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {

                if($this->excelFile){
                    $sms = new SMS();

                    $this->excelFile->update([
                        "state" => StateType::SUCCESS
                    ]);

                    $sms->send($this->user->phone, substr(0, 25)."파일 저장 완료!");
                }

            },
        ];
    }
}
