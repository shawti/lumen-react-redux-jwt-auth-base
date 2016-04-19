<?php

use Illuminate\Container\Container;

/*
 * Because Lumen has no config_path function, we need to add this function
 * to make JWT Auth works.
 */
if ( ! function_exists('config_path')) {
    /**
     * Get the configuration path.
     *
     * @param string $path
     *
     * @return string
     */
    function config_path($path = '')
    {
        return app()->basePath() . '/config' . ($path ? '/' . $path : $path);
    }
}

if ( ! function_exists('app')) {
    /**
     * Get the available container instance.
     *
     * @param string $make
     * @param array  $parameters
     *
     * @return mixed|\Illuminate\Foundation\Application
     */
    function app($make = null, $parameters = [])
    {
        return ($make === null)
            ? Container::getInstance()
            : Container::getInstance()->make($make, $parameters);
    }
}

if ( ! function_exists('asset')) {
    /**
     * Generate an asset path for the application.
     *
     * @param string $path
     * @param bool   $secure
     *
     * @return string
     */
    function asset($file, $secure = null)
    {
        return app()->make('url')->asset($file, $secure);
    }
}

if ( ! function_exists('view')) {
    /**
     * Get the evaluated view contents for the given view.
     *
     * @param string $view
     * @param array  $data
     * @param array  $mergeData
     *
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    function view($view = null, $data = [], $mergeData = [])
    {
        return ($view === null)
            ? app()->make('view')
            : app()->make('view')->make($view, $data, $mergeData);
    }
}
