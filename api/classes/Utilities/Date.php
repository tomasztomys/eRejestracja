<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 21.05.2016
 * Time: 18:22
 */

namespace Utilities;


class Date
{

    public static function convertRFC3339ToISOFormat($RFC3339Date) {
        $datetime = \DateTime::createFromFormat(\DateTime::RFC3339, $RFC3339Date);
        return $datetime->format('Y-m-d H:i:s');
    }

    public static function convertISOToRFC3339Format($RFC3339Date) {
        $datetime = \DateTime::createFromFormat('Y-m-d H:i:s', $RFC3339Date);
        return $datetime->format(\DateTime::RFC3339);
    }
}