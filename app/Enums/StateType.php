<?php
/**
 * Created by PhpStorm.
 * User: master
 * Date: 2020-05-31
 * Time: 오후 7:39
 */

namespace App\Enums;


final class StateType
{
    const FAIL = "FAIL";
    const ONGOING = "ONGOING";
    const SUCCESS = "SUCCESS";

    static function getValues()
    {
        return [self::FAIL, self::ONGOING, self::SUCCESS];
    }
}
