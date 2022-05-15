<?php

use App\Http\Controllers\PostsController;
use App\Http\Controllers\TokensController;
use App\Http\Controllers\UserPostsController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('users', UsersController::class);
Route::apiResource('posts', PostsController::class)->except(['update']);
Route::apiResource('users.posts', UserPostsController::class)->only(['index']);
Route::apiResource('tokens', TokensController::class)->except(['update']);
