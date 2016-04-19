<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Exception\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    /**
     * Handle a signin request to the application.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function postSignin(Request $request)
    {
        try {
            $this->validate($request, [
                'username' => 'required|max:128',
                'password' => 'required',
            ],[
                'username.required' => '用户名不能为空！',
                'username.max' => '用户名长度过长！',
                'password.required'  => '密码不能为空！',
            ]);
        } catch (HttpResponseException $e) {
            return response()->json([
                'error' => [
                    'message' => 'invalid_auth',
                ],
            ], Response::HTTP_BAD_REQUEST);
        }

        $credentials = $this->getCredentials($request);

        try {
            // Attempt to verify the credentials and create a token for the user
            if ( ! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'error' => [
                        'message' => 'invalid_credentials',
                    ],
                ], Response::HTTP_UNAUTHORIZED);
            }
        } catch (JWTException $e) {
            // Something went wrong whilst attempting to encode the token
            return response()->json([
                'error' => [
                    'message' => 'could_not_create_token',
                ],
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        // All good so return the token
        return response()->json(compact('token'));
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    protected function getCredentials(Request $request)
    {
        return $request->only('username', 'password');
    }
}
