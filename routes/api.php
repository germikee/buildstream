<?php

use App\Http\Controllers\JobController;
use App\Http\Controllers\JobResponseController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('jobs', [JobController::class, 'index'])->name('jobs.index');
Route::post('jobs', [JobController::class, 'store'])->name('jobs.store');
Route::post('jobs/{job}/response', JobResponseController::class)->name('responses.store');
