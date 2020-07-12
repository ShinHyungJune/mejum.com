<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Target::class, function (Faker $faker) {
    return [
        "idx" => $faker->unique()->sentence,
        "platform" => \App\Enums\PlatformType::YOUTUBE,
        "url" => "https://www.youtube.com/watch?v=SBbodj2xqOM",
        "title" => "박막례",
        "body" => "김치장아찌",
        "thumbnail" => "https://www.youtube.com/watch?v=SBbodj2xqOM",
    ];
});
