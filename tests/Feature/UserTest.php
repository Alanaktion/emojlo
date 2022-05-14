<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_the_user_can_change_their_name()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $newName = $this->faker->emoji();

        $response = $this->putJson(route('users.update', $user), [
            'name' => $newName,
            'email' => $user->email,
        ]);
        $response->assertOk();
        $response->assertJson([
            'name' => $newName,
        ]);
    }

    public function test_the_user_name_must_be_emoji()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);

        $response = $this->putJson(route('users.update', $user), [
            'name' => $this->faker->name(),
            'email' => $user->email,
        ]);
        $response->assertUnprocessable();
    }
}
