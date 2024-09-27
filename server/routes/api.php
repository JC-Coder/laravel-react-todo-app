<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HealthController;
use App\Http\Controllers\TodoController;

Route::get('/health', function () {
    return response()->json(['message' => 'Server is running']);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/health', [HealthController::class, 'check']);


function userRoutes()
{
    return [
        Route::get('/me', [AuthController::class, 'user']),
    ];
}

function todoRoutes()
{
    return [
        Route::get('/todos', [TodoController::class, 'index']),
        Route::post('/todos', [TodoController::class, 'store']),
        Route::put('/todos/{id}', [TodoController::class, 'update']),
        Route::delete('/todos/{id}', [TodoController::class, 'destroy']),
    ];
}



Route::middleware(['auth:sanctum', 'check.auth'])->group(function () {
    userRoutes();
    todoRoutes();
});
