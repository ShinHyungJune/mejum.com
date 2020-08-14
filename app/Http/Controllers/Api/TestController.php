<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use League\Glide\Api\Api;

class TestController extends ApiController
{
    public function test(Request $request)
    {
        $request->validate([
            "img" => "required|image|max:60448"
        ]);

    }
}
