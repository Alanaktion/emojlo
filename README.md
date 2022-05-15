# Emojlo

An Emoji-only social microblogging site. Vue SPA with a Laravel API back-end.

## Setup

Get a web server set up with the requirements:

- PHP 8.1
- MySQL 8 or other Laravel-compatible RDBMS
- Node LTS (16 or later)

Then clone the repo and run this stuff:

```bash
cp .env.example .env
composer install
# Add database details to .env file, then continue
php artisan key:generate
php artisan migrate
npm ci
npm run dev
```

## API

All core functionality in Emojlo is handled by a REST API. Endpoints that require authentication can work with an HTTP cookie when used from the web UI, or with a bearer token when called from a separate app.

### Authentication

- POST /login - log in from a web interface
- POST /logout - log out from a web interface

### Tokens

- GET /tokens - list access tokens for the authenticated user
- POST /tokens - create an access token for the authenticated user. If no user is authenticated, accepts `email` and `password` fields
- DELETE /tokens/{token} - delete an access token - must be authenticated

### Users

- GET /api/user - get the currently authenticated user
- GET /api/users - get a paginated list of users, sorted by most-recent
- GET /api/users/{username} - get a user by username
- POST /api/users - create a user account
- PUT /api/users/{username} - update a user account - must be the authenticated user
- DELETE /api/users/{username} - delete a user account - must be the authenticated user

### Posts

- GET /api/posts - get a paginated list of posts, sorted by most-recent
- GET /api/users/{username}/posts - get a paginated list of posts by a specific user, sorted by most-recent
- GET /api/posts/{id} - get a post by id
- POST /api/posts - create a post
- DELETE /api/posts/{id} - delete a post - must be owned by the authenticated user
