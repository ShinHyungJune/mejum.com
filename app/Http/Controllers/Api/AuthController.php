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
            /* "avatar" => "required|base64image|base64mimes:jpeg,png,jpg,gif,svg|base64max:2048", */
            'phone' => 'required|string|unique:users',
            'password' => 'required|min:8|string|confirmed',
        ]);

        $veryNumber = VerifyNumber::where("phone", $request->phone)->where("verified", true)->first();

        if(!$veryNumber || !$veryNumber->verified)
            return $this->respondForbidden();

        DB::transaction(function() use($request) {
            $user = User::create([
                'name' => $request->name,
                'phone' => $request->phone,
                'password' => bcrypt($request->password),
            ]);

            // $this->storeBase64AndAddMedia($request->avatar, $user);

            VerifyNumber::where('phone', $request->phone)->first()->delete();
        });

        return $this->respondSuccessfully(null,"회원가입이 완료되었습니다.");
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
