<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends BaseController
{
  public function register(Request $request)
  {
    try {
      $validatedData = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:8',
      ]);

      $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'password' => Hash::make($validatedData['password']),
      ]);

      $token = $user->createToken('auth_token')->plainTextToken;

      return $this->sendResponse([
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer',
      ], 'User created successfully');
    } catch (\Exception $e) {
      return $this->sendError($e->getMessage(), [], 422);
    }
  }

  public function login(Request $request)
  {
    try {
      if (!Auth::attempt($request->only('email', 'password'))) {
        return $this->sendError('Invalid login details', [], 401);
      }

      $user = User::where('email', $request['email'])->firstOrFail();
      $token = $user->createToken('auth_token')->plainTextToken;

      return $this->sendResponse([
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer',
      ], 'User logged in successfully');
    } catch (\Exception $e) {
      return $this->sendError($e->getMessage(), [], 422);
    }
  }

  public function user(Request $request)
  {
    Log::info($request->user());
    if ($request->user()) {
      return $request->user();
    } else {
      return response()->json([
        'message' => 'User not authenticated',
      ], 401);
    }
  }
}
