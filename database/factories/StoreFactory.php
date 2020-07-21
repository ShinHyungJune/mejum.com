<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Model;
use Faker\Generator as Faker;

$factory->define(\App\Store::class, function (Faker $faker) {
    $group = factory(\App\Group::class)->create();
    $user = factory(\App\User::class)->create();

    return [
        "group_id" => $group->id,
        "user_id" => $user->id,
        "title" => $faker->paragraph,
        "contact" => $faker->paragraph,
        "address" => $faker->paragraph,
        "address_detail" => $faker->paragraph,
        "park" => true,
        "closed" => true,
        "secret" => false
    ];
});
