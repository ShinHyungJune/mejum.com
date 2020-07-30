<?php

use Aws\Laravel\AwsServiceProvider;

return [

    /*
    |--------------------------------------------------------------------------
    | AWS SDK Configuration
    |--------------------------------------------------------------------------
    |
    | The configuration options set in this file will be passed directly to the
    | `Aws\Sdk` object, from which all client objects are created. This file
    | is published to the application config directory for modification by the
    | user. The full set of possible options are documented at:
    | http://docs.aws.amazon.com/aws-sdk-php/v3/guide/guide/configuration.html
    |
    */
    'basic' => [
        'key'    => env('NAVER_API_KEY', 'gEf2Obm290rhS5luowhC'),
        'secret' => env('NAVER_API_SECRET', 'qy8flzFjTF'),
        'domain' => env('NAVER_API_DOMAIN', 'https://openapi.naver.com'),
    ],
    'cloud' => [
        'key'    => env('NAVER_CLOUD_API_KEY', 'ue3zysm2ng'),
        'secret' => env('NAVER_CLOUD_API_SECRET', 'RsUwfvXmRh3FZgyvwrLFJW8ToLd4vz7isBbPlwri'),
        'domain' => env('NAVER_CLOUD_API_DOMAIN', 'https://naveropenapi.apigw.ntruss.com'),
    ],
];
