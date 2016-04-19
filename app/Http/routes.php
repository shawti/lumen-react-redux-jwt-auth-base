<?php
$app->group(['prefix' => 'api', 'middleware' => ['jwt.auth']], function () use ($app) {
    $app->get('/getdata', function() {
        return response()->json(['data' => 'Valid JWT found! This protected data was fetched from the server.', 'username' => Auth::user()->name]);
    });
});


$app->get('/', 'SiteController@index');
$app->get('/signin', 'SiteController@index');
$app->get('/protected', 'SiteController@index');
$app->post('/api/auth/signin', 'Auth\AuthController@postSignin');
