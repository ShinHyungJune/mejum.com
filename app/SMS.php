<?php

namespace App;

use Aws\Sns\SnsClient;
use Matrix\Exception;

class SMS
{
    protected $client;

    public function __construct()
    {
        $this->client = new \Aws\Sns\SnsClient([
            "region" => "ap-northeast-1",
            "version" => "2010-03-31",
        ]);
    }

    public function send($to, $message)
    {
        try{
            $this->client->checkIfPhoneNumberIsOptedOut(['phoneNumber' => $to]);
        }catch(\Throwable $exception) {
          return false;
        }

        /*if ($result['isOptedOut']) { // 잘못된 번호 맞다면
            return;
        }*/

        return $this->client->publish([
            "Message" => $message,
            "PhoneNumber" => $to
        ]);
    }
}
