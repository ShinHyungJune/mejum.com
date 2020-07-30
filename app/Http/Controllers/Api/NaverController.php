<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class NaverController extends ApiController
{
    public function search(Request $request)
    {
        $request->validate([
            "word" => "required|string|max:500"
        ]);

        $response = Http::withHeaders([
            'X-Naver-Client-Id' => config("naver.basic.key"),
            'X-Naver-Client-Secret' => config("naver.basic.secret")
        ])->get(config("naver.basic.domain").'/v1/search/local.json?query='.$request->word.'&display=5');

        return $this->respond($response->json());
    }

    public function getGeoCode(Request $request)
    {
        $request->validate([
            "address" => "required|string|max:2000"
        ]);

        $response = Http::withHeaders([
            'X-NCP-APIGW-API-KEY-ID' => config("naver.cloud.key"),
            'X-NCP-APIGW-API-KEY' => config("naver.cloud.secret")
        ])->get(config("naver.cloud.domain").'/map-geocode/v2/geocode', [
            "query" => "서울특별시 중구 세종대로 99 덕수궁"
        ]);

        return $this->respond($response->json());
    }
}
