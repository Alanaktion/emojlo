<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;

class UserPostsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Post::class, 'Post');
    }

    /**
     * @return \Illuminate\Pagination\CursorPaginator<Post>
     */
    public function index(User $user)
    {
        return $user->posts()->with('user')->latest()->cursorPaginate();
    }
}
