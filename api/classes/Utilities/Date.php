<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 21.05.2016
 * Time: 18:22
 */

namespace Utilities;

/**
 * Klasą do konwertowania dat między formatami ISO i RFC3339
 *
 * @package Utitlities
 */
class Date
{

    /**
     * Konwertuję datę z formatu RFC3339 do ISO
     *
     * @param $RFC3339Date data w formacie RFC3339
     * @return string data w formacie ISO
     */
    public static function convertRFC3339ToISOFormat($RFC3339Date) {
        $datetime = \DateTime::createFromFormat(\DateTime::RFC3339, $RFC3339Date);
        return $datetime->format('Y-m-d H:i:s');
    }

    /**
     * Konwertuję datę z formatu ISO do RFC3339
     *
     * @param $RFC3339Date data w formacie ISO
     * @return string data w formacie RFC3339
     */
    public static function convertISOToRFC3339Format($RFC3339Date) {
        $datetime = \DateTime::createFromFormat('Y-m-d H:i:s', $RFC3339Date);
        return $datetime->format(\DateTime::RFC3339);
    }
}