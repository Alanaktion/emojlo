<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be visible for serialization.
     *
     * @var array<int, string>
     */
    protected $visible = [
        'id',
        'name',
        'created_at',
        'gravatar',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'gravatar',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getRouteKeyName(): string
    {
        return 'name';
    }

    /**
     * Get the user's Gravatar URL.
     */
    public function getGravatarAttribute(): string
    {
        return 'https://www.gravatar.com/avatar/' . md5($this->email) . '?d=retro';
    }

    /**
     * Get the user's posts
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany<Post>
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * Get the users the user is following
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<User>
     */
    public function following()
    {
        return $this->belongsToMany(User::class, 'user_follows', 'user_id', 'followed_user_id')
            ->using(UserFollow::class)
            ->withPivot(['created_at']);
    }

    /**
     * Get the users following this user
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<User>
     */
    public function followers()
    {
        return $this->belongsToMany(User::class, 'user_follows', 'followed_user_id', 'user_id')
            ->using(UserFollow::class)
            ->withPivot(['created_at']);
    }
}
