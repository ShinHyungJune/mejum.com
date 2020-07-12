<?php

namespace App\Http\Controllers\Api;

use App\Enums\StateType;
use App\ExcelFile;
use App\Exports\CommentsExport;
use App\Http\Resources\ExcelFileCollection;
use App\Http\Resources\ExcelFileResource;
use App\Target;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

class ExcelFileController extends ApiController
{
    public function index(Request $request)
    {
        $excelFiles = auth()->user()->excelFiles()->paginate(50);

        return new ExcelFileCollection($excelFiles);
    }

    public function store(Request $request)
    {
        $request->validate([
            "target_id" => "required|integer"
        ]);

        $target = Target::find($request->target_id);

        if(!$target)
            return $this->respondNotFound();

        if($target->user->id != auth()->id())
            return $this->respondForbidden();

        $filename = auth()->id()."_".$target->id."_".Carbon::now()->format("Y_m_d_H_i_s").".xlsx";

        $excelFile = $target->excelFiles()->create([
            "user_id" => auth()->id(),
            "filename" => $filename,
            "disk" => "s3"
        ]);

        (new CommentsExport(auth()->user(), $target, $excelFile))->store($filename, "s3");

        return $this->respondSuccessfully(null, "엑셀파일로 전환이 완료되면 알림문자로 알려드리겠습니다! 다운로드 메뉴를 확인해주세요!");
    }

    public function show(Request $request, $id)
    {
        $excelFile = ExcelFile::find($id);

        if(!$excelFile)
            return $this->respondNotFound();

        if($excelFile->user_id != auth()->id())
            return $this->respondForbidden();

        if($excelFile->state != StateType::SUCCESS)
            return $this->respondForbidden();

        return Storage::disk($excelFile->disk)->download($excelFile->filename);
    }

    public function download(Request $request)
    {
        $limitCount = 100000;

        $request->validate([
            "target_id" => "required|integer"
        ]);

        $target = Target::find($request->target_id);

        if(!$target)
            return $this->respondNotFound();

        if($target->user->id != auth()->id())
            return $this->respondForbidden();

        if($target->comments()->count() > $limitCount)
            return redirect()->back();

        $filename = auth()->id()."_".$target->id."_".Carbon::now()->format("Y_m_d_H_i_s").".xlsx";

        return (new CommentsExport(auth()->user(), $target, null))->download($filename);
    }
}
