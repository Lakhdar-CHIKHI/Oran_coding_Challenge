<?php

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
  
  
// use App\Http\Controllers\Api\AuthController;
// use App\Http\Controllers\Api\TodosController;
// use App\Http\Controllers\Api\CategoryController;
// use App\Http\Controllers\Api\UserController;

// Route::middleware('auth:api')->get('/token/revoke', function (Request $request) {
//     DB::table('oauth_access_tokens')
//         ->where('user_id', $request->user()->id)
//         ->update([
//             'revoked' => true
//         ]);
//     return response()->json('DONE');
// });


Route::post('register', 'Api\AuthController@register');
Route::post('login', 'Api\AuthController@login');
     
Route::middleware('auth:api')->group( function () {
    Route::post('todo', 'Api\TodosController@store');
    Route::post('todo/done/{id}', 'Api\TodosController@markAsDone');
    Route::delete('todo/{id}', 'Api\TodosController@destroy');

    Route::get('category', 'Api\CategoryController@index');
    Route::post('category', 'Api\CategoryController@store');
    Route::post('category/share/{id}', 'Api\CategoryController@share');
    Route::delete('category/{id}', 'Api\CategoryController@destroy');

    Route::resource('users', 'Api\UserController');

    Route::get('token/revoke', function (Request $request) {
        DB::table('oauth_access_tokens')
            ->where('user_id', $request->user()->id)
            ->update([
                'revoked' => true
            ]);
        return response()->json('DONE');
    });

});