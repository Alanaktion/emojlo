<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\UpdatesUserProfileInformation;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except(['index', 'show']);
        $this->authorizeResource(User::class, 'user');
    }

    /**
     * @return \Illuminate\Pagination\CursorPaginator<User>
     */
    public function index()
    {
        return User::latest()->cursorPaginate();
    }

    /**
     * @return User
     */
    public function store(Request $request)
    {
        return User::create($request->all());
    }

    /**
     * @return User
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * @return User
     */
    public function update(Request $request, User $user, UpdatesUserProfileInformation $action)
    {
        $action->update($user, $request->input());
        return $user;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
