<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TodoController extends BaseController
{
    public function index(Request $request)
    {
        $userTodos = Todo::where('user_id', Auth::id())->get();
        return $this->sendResponse($userTodos, 'Todos fetched successfully');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
        ]);

        $todo = Todo::create([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => $request->completed ?? false,
            'user_id' => Auth::id(),
        ]);

        return $this->sendResponse($todo, 'Todo created successfully');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
        ]);

        $userId = Auth::id();
        $todo = Todo::where('id', $id)->where('user_id', $userId)->first();

        if (!$todo) {
            return $this->sendError('Todo not found', 404);
        }

        $todo->update($request->all());
        return $this->sendResponse($todo, 'Todo updated successfully');
    }

    public function destroy($id)
    {
        $userId = Auth::id();
        $todo = Todo::where('id', $id)->where('user_id', $userId)->first();

        if (!$todo) {
            return $this->sendError('Todo not found', 404);
        }

        $todo->delete();
        return $this->sendResponse([], 'Todo deleted successfully');
    }
}
