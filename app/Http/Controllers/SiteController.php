<?php

namespace App\Http\Controllers;

use View;

/**
 * Site controller.
 */
class SiteController extends Controller
{
    public function index()
    {
        return View::make('site.index');
    }
}
