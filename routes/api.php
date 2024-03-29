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

Route::post("/test", 'Api\TestController@test');

Route::group(["middleware" => "auth:sanctum"], function() {
    Route::get("/search", "Api\NaverController@search");
    Route::get("/getGeoCode", "Api\NaverController@getGeoCode");
    Route::get("/getAddress", "Api\NaverController@getAddress");

    Route::post("/groups/banish", "Api\GroupController@banish");
    Route::post("/groups/appoint", "Api\GroupController@appoint");
    Route::get("/groups/join", "Api\GroupController@join");

    Route::resource("/groups", "Api\GroupController");
    Route::resource("/stores", "Api\StoreController");

    Route::get("/votes/join", "Api\VoteController@join");
    Route::resource("/votes", "Api\VoteController");
    Route::resource("/choices", "Api\ChoiceController");
    Route::resource("/menus", "Api\MenuController");
    Route::resource("/reviews", "Api\ReviewController");
});

Route::post('/passwordReset/send', 'Api\PasswordResetController@sendMail');
Route::post('/passwordReset', 'Api\PasswordResetController@reset');


