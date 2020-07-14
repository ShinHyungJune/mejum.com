<?php

namespace App\Http\Controllers\Api;

use App\Traits\ImageTrait;
use App\User;
use App\VerifyNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends ApiController
{
    // use ImageTrait;

    /**
     * Create user
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function signup(Request $request)
    {

        $request->validate([
            'name' => 'required|string|unique:users',
            "avatar" => "image",
            'phone' => 'required|string|unique:users',
            'password' => 'required|min:8|string|confirmed',
        ]);

        $request->phone = "+82".$request->phone;

        $veryNumber = VerifyNumber::where("phone", $request->phone)->where("verified", true)->first();

        if(!$veryNumber || !$veryNumber->verified)
            return $this->respondForbidden();

        DB::transaction(function() use($request) {
            $user = User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
            ]);

            $user->addMedia($request->avatar)->toMediaCollection("img", "s3");

            VerifyNumber::where('phone', $request->phone)->first()->delete();
        });

        return $this->respondSuccessfully([
            "phone" => $request->phone,
            "password" => $request->password
        ],"회원가입이 완료되었습니다.");
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return $this->respond($request->user());
    }
}
