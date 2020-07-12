<?php

namespace App;

use Aws\Sns\SnsClient;

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
        if (!$result = $this->client->checkIfPhoneNumberIsOptedOut(['phoneNumber' => $to])) { // 번호확인 실패
            return;
        }

        if ($result['isOptedOut']) { // 잘못된 번호 맞다면
            return;
        }

        return $this->client->publish([
            "Message" => $message,
            "PhoneNumber" => $to
        ]);
    }
}
