<?php

$factory->define(App\User::class, function ($faker) {
    return [
        'name'  => $faker->name,
        'email' => $faker->email,
    ];
});
