<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Post::class, 'post');
    }

    /**
     * @return \Illuminate\Pagination\CursorPaginator<Post>
     */
    public function index()
    {
        return Post::with('user')->latest()->cursorPaginate();
    }

    /**
     * @return Post
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'body' => [
                'required',
                'string',
                'regex:' . config('emoji.pattern_whitespace'),
            ],
        ]);
        /** @var \App\Models\User */
        $user = $request->user();
        return $user->posts()->create([
            'body' => $data['body'],
        ]);
    }

    /**
     * @return Post
     */
    public function show(Post $post)
    {
        $post->load('user');
        return $post;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(null, 204);
    }
}
