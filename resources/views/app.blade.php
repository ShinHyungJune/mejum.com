<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scrollbar type01">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{config("app.name")}}</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="/css/default.css?{{\Illuminate\Support\Carbon::now()}}">
        <link rel="stylesheet" href="/css/animate.css?{{\Illuminate\Support\Carbon::now()}}">
        <link rel="stylesheet" href="/css/common.css?{{\Illuminate\Support\Carbon::now()}}">
        <link rel="stylesheet" href="/css/style.css?{{\Illuminate\Support\Carbon::now()}}">
        <script src="/js/kakao.js"></script>
    </head>
    <body>
        <div id="app">

        </div>
        <script src="{{mix('/js/app.js')}}?{{\Carbon\Carbon::now()}}"></script>
        <script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=ue3zysm2ng"></script>
    </body>
</html>
