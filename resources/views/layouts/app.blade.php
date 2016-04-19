<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <title>Libra - Invoice system</title>

        <link rel="stylesheet" href="{{ asset('/css/app.css') }}" media="screen" title="no title" charset="utf-8">

        @stack('styles')
    </head>
    <body>
        <div class="wrapper">
            @yield('content')
        </div>

        <script type="text/javascript" src="{{ asset('/js/app.js') }}" charset="utf-8"></script>

        @stack('scripts')
    </body>
</html>
