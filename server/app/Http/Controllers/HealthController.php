<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class HealthController extends Controller
{
    public function check(Request $request)
    {
        Log::info('New health check request');
        return response()->json(['status' => 'healthy']);
    }
}
