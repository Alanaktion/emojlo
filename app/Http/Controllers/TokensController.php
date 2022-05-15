<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class TokensController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['store']);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection<int, \Illuminate\Database\Eloquent\Model>
     */
    public function index(Request $request)
    {
        return $request->user()->tokens;
    }

    /**
     * @return array<string, string>
     */
    public function store(Request $request)
    {
        if ($request->user()) {
            $request->validate([
                'name' => 'required',
            ]);
            $user = $request->user();
        } else {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
                'name' => 'required',
            ]);
            $user = User::where('email', $request->input('email'))->first();
            if (!$user || !Hash::check($request->input('password'), $user->password)) {
                throw ValidationException::withMessages([
                    'password' => [config('auth.password')],
                ]);
            }
        }

        $token = $user->createToken($request->input('name'));
        return [
            'token' => $token->plainTextToken,
        ];
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Request $request, string $token)
    {
        $this->middleware('auth:sanctum');
        $request->user()->tokens()->where('id', $token)->delete();
        return response()->json(null, 204);
    }
}
