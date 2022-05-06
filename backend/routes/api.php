<?php

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
Route::group(['namespace' => '\App\Http\Controllers\\'],function(){
    Route::get('all','ProjectController@index');
    Route::get('get/{id}','ProjectController@get');
    Route::post('delete/{id}','ProjectController@delete')->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
    Route::post('add','ProjectController@add')->withoutMiddleware(\App\Http\Middleware\VerifyCsrfToken::class);
});
