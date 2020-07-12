<?php
/**
 * Created by PhpStorm.
 * User: master
 * Date: 2020-05-31
 * Time: 오후 7:39
 */

namespace App\Enums;


final class PlatformType
{
    const FACEBOOK = "FACEBOOK";
    const YOUTUBE = "YOUTUBE";
    const NAVER = "NAVER";
    const INSTAGRAM = "INSTAGRAM";

    static function getValues()
    {
        return [self::FACEBOOK, self::YOUTUBE, self::NAVER, self::INSTAGRAM];
    }
}
