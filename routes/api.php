<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/verifyNumber", "Api\VerifyNumberController@store");
Route::patch("/verifyNumber", "Api\VerifyNumberController@update");

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', 'Api\AuthController@login')->name("login");
    Route::post('/signup', 'Api\AuthController@signup');

    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('/logout', 'Api\AuthController@logout');
        Route::get('/user', 'Api\AuthController@user');
    });
});

Route::group(["middleware" => "auth:sanctum"], function() {
    Route::get("/groups/join", "Api\GroupController@join");
    Route::resource("/groups", "Api\GroupController");
});

Route::post('/passwordReset/send', 'Api\PasswordResetController@sendMail');
Route::post('/passwordReset', 'Api\PasswordResetController@reset');


