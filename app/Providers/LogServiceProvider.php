<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Monolog\Handler\RotatingFileHandler;
use Monolog\Logger;

class LogServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register()
    {
        $app = $this->app;

        $app->app->configureMonologUsing(function (Logger $monolog) use ($app) {
            return $monolog->pushHandler(
                new RotatingFileHandler($app->storagePath() . '/logs/corgi.log', 5)
            );
        });
    }
}
