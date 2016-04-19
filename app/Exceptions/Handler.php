<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Response;
use Illuminate\Validation\ValidationException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
        TokenMismatchException::class,
        TokenExpiredException::class,
        TokenInvalidException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param \Exception $e
     */
    public function report(Exception $e)
    {
        parent::report($e);
    }

    /**
     * Get class name from instance.
     *
     * @param mixed $object
     *
     * @return string
     */
    protected function getClassName($object)
    {
        return Arr::last(
            explode('\\', get_class($object)),
            function () { return true; }
        );
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Exception               $e
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        $class = $this->getClassName($e);

        if (method_exists($this, "render{$class}")) {
            return call_user_func_array([$this, "render{$class}"], [$request, $e]);
        }

        return parent::render($request, $e);
    }

    /**
     * Render token expired exception.
     *
     * @param \Illuminate\Http\Request                        $request
     * @param \Tymon\JWTAuth\Exceptions\TokenExpiredException $e
     *
     * @return \Illuminate\Http\Response
     */
    protected function renderTokenExpiredException($request, TokenExpiredException $e)
    {
        return Response::json(['token_expired'], $e->getStatusCode());
    }

    /**
     * Render token invalid exception.
     *
     * @param \Illuminate\Http\Request                        $request
     * @param \Tymon\JWTAuth\Exceptions\TokenInvalidException $e
     *
     * @return \Illuminate\Http\Response
     */
    protected function renderTokenInvalidException($request, TokenInvalidException $e)
    {
        return Response::json(['token_invalid'], $e->getStatusCode());
    }

    /**
     * Render token mismatch exception.
     *
     * @param \Illuminate\Http\Request                   $request
     * @param \Illuminate\Session\TokenMismatchException $e
     *
     * @return \Illuminate\Http\Response
     */
    protected function renderTokenMismatchException($request, TokenMismatchException $e)
    {
        return Response::json(['token_mismatch'], 400);
    }
}
