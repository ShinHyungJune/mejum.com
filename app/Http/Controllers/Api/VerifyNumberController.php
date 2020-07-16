<?php

namespace App\Http\Controllers\Api;

use App\Mail\VerifyNumberCreated;
use App\Mail\VerifyNumbers\create;
use App\SMS;
use App\VerifyNumber;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;

class VerifyNumberController extends ApiController
{
    public function store(Request $request)
    {
        $request->validate([
           "phone" => "required|max:255|unique:users",
        ]);

        $number = random_int(1000,9999);

        $verifyNumber = VerifyNumber::updateOrCreate([
            "phone" => $request->phone
        ],[
            "phone" => $request->phone,
            "number" => $number,
            "verified" => false
        ]);

        $sms = new SMS();

        $sms->send($request->phone, "인증번호 [${number}]\n- ".config("app.name")." -");

        // return $this->respondSuccessfully(null, __("response.verifyNumber")["send mail"]);
        return $this->respondSuccessfully(null, "인증번호가 전송되었습니다.");
    }

    public function show($id)
    {
        //
    }


    public function update(Request $request)
    {
        $request->validate([
            "phone" => "required|unique:users|max:255",
            "number" => "required|max:255",
        ]);

        $verifyNumber = VerifyNumber::where('phone', $request->phone)->where('number', $request->number)->first();

        if(!$verifyNumber)
            return $this->respondNotFound("인증번호가 일치하지 않습니다.");
            // return $this->respondNotFound(__("response.verifyNumber")["do not match"]);

        $verifyNumber->update([
            "verified" => true
        ]);

        // return $this->respondSuccessfully($verifyNumber, __("response.verifyNumber")["verified"]);
        return $this->respondSuccessfully($verifyNumber, "성공적으로 인증되었습니다.");
    }

    public function destroy($id)
    {
        //
    }
}
