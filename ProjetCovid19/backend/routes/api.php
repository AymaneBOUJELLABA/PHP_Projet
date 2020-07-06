<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('/mobile/login', 'AuthController@login');
    Route::post('/mobile/logout', 'AuthController@logout');
    Route::post('/mobile/register', 'AuthController@register');
    Route::post('/mobile/refresh', 'AuthController@refresh');
    Route::post('/mobile/me', 'AuthController@me');

});



Route::get('comments', 'CommentController@index');
Route::get('comment/{id}', 'CommentController@show');
Route::post('comment', 'CommentController@store');
Route::put('comment/{id}', 'CommentController@update');
Route::delete('comment/{id}', 'CommentController@delete');

//les routes pour la gestion des questions du formulaire
Route::get('questions/treated', 'QuestionController@treated');
Route::get('questions/not-treated', 'QuestionController@notTreated');
Route::get('questions/graphs', 'QuestionController@graphs');
Route::get('questions', 'QuestionController@index');
Route::get('question/verify/{id}', 'QuestionController@hasQuestion');
Route::get('question/{id}', 'QuestionController@show');
Route::post('question/{id}', 'QuestionController@store');
Route::put('question/{id}', 'QuestionController@update');
Route::delete('question/{id}', 'QuestionController@delete');


//les routes pour les informations de chaque utilisateur
Route::get('infos', 'InfoController@index');
Route::get('info/{id}', 'InfoController@show');
Route::post('info', 'InfoController@store');
Route::post('info/{id}', 'InfoController@storeid');
Route::put('info/{id}', 'InfoController@update');
Route::delete('info/{id}', 'InfoController@delete');


//les routes pour controller l'authentification de l'utilisateur
Route::middleware('auth:sanctum')->group(
    function () {
        Route::get('/user', 'UserController@currentUser');
        Route::get('/users', "UserController@index");

        //pour l'admin
        Route::post('/admin/register', 'UserController@registerAdmin')->withoutMiddleware('auth:sanctum');
        //pour utilisateur simple
        Route::post('/user/logout', 'UserController@logout');
        Route::post('/user/login', 'UserController@login')->withoutMiddleware('auth:sanctum');
        Route::post('/user/register', 'UserController@register')->withoutMiddleware('auth:sanctum');

        Route::put('/user/update/{id}', 'UserController@update');

        Route::delete('/user/delete/{id}','UserController@delete');
    }
);
