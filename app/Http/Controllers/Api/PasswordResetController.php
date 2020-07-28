<?php

namespace App\Http\Controllers\Api;

use App\PasswordReset;
use App\ResetPassword;
use App\SMS;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class PasswordResetController extends ApiController
{
    public function reset(Request $request)
    {
        $this->validate($request, [
            "phone" => "required|string|max:255",
            "token" => "required|string|max:255",
            "password" => "required|string|confirmed|min:8"
        ]);

        $passwordReset = PasswordReset::where("phone", $request->phone)->where("token", $request->token)->first();

        if(!$passwordReset)
            return $this->respondForbidden();

        $user = User::where("phone", $request->phone)->first();

        $user->password = Hash::make($request->password);

        $user->save();

        PasswordReset::where("phone", $request->phone)->where("token", $request->token)->delete();

        return $this->respond(["message" => "비밀번호 초기화되었습니다!"]);
    }

    public function sendMail(Request $request)
    {
        $this->validate($request, [
            "phone" => "required|string|max:255"
        ]);

        if(!User::where("phone", $request->phone)->exists())
            return $this->respondNotFound("찾을 수 없는 아이디입니다.");

        $token = random_int(1000,9999);

        $passwordReset = PasswordReset::where("phone", $request->phone)->first();

        $passwordReset ? $passwordReset->update([
            "phone" => $request->phone,
            "token" => $token
        ]) : PasswordReset::create([
            "phone" => $request->phone,
            "token" => $token
        ]);


        $sms = new SMS();

        $result = $sms->send($request->phone, "인증번호 [${token}]\n- ".config("app.name")." -");

        if(!$result)
            return $this->respondForbidden("유효하지 않은 번호입니다.");

        return $this->respondCreated(null, "인증번호가 발송되었습니다!");
    }
}
