<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <div class="form-group">
        <label for="">activate Link</label>
        <button href='{{ url("register/confirm/{$user->active_token}") }}' class="btn btn-primary">Click me!</button>
    </div>


</body>
</html>