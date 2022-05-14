<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name') }}</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="theme-color" content="#2dd4bf">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body class="bg-slate-100 text-slate-800 dark:bg-gray-900 dark:text-gray-100 antialiased">
    <div id="app"></div>
    @auth
        <script id="user-json" type="application/json">
            @json(Auth::user())
        </script>
    @endauth
</body>
</html>
