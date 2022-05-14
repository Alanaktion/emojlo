<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_the_user_can_create_posts()
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson(route('posts.store'), [
            'body' => $this->faker->emoji(),
        ]);
        $response->assertCreated();
    }

    public function test_the_user_cannot_post_non_emoji()
    {
        Sanctum::actingAs(User::factory()->create());

        $response = $this->postJson(route('posts.store'), [
            'body' => $this->faker->text(),
        ]);
        $response->assertUnprocessable();
    }

    public function test_the_user_can_delete_posts()
    {
        $user = User::factory()->hasPosts(1)->create();
        Sanctum::actingAs($user);

        $post = $user->posts()->first();

        $response = $this->delete(route('posts.destroy', $post));
        $response->assertNoContent();
    }

    public function test_the_user_can_view_posts()
    {
        $user = User::factory()->hasPosts(1)->create();
        Sanctum::actingAs($user);

        $post = $user->posts()->first();

        $response = $this->get(route('posts.show', $post));
        $response->assertOk();
        $response->assertJson([
            'id' => $post->id,
        ]);
    }

    public function test_the_user_cannot_delete_other_posts()
    {
        Sanctum::actingAs(User::factory()->create());

        $user = User::factory()->hasPosts(1)->create();
        $post = $user->posts()->first();

        $response = $this->delete(route('posts.destroy', $post));
        $response->assertForbidden();
    }
}
