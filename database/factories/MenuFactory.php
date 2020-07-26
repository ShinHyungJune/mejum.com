<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Menu::class, function (Faker $faker) {
    $store = factory(\App\Store::class)->create();

    return [
        "store_id" => $store->id,
        "title" => $faker->title,
        "body" => $faker->paragraph,
        "price" => $faker->numberBetween(0, 10000)
    ];
});
