<?php

namespace Database;

/**
 * Klasa do obsługi konfiguracji bazy danych
 *
 * @package Database
 */
class Database
{
    /**
     * Ustanowienie połączenia z bazą danych
     *
     * Metoda służąca do ustanowienia połaczęnia z bazą danych przy użyciu biblioteki RedBeanPHP
     *
     * @param $config array Tablica z konfiguracją bazy danych
     */
    public function connect($config) {
        \R::setup( 'mysql:host='.$config['host'].';dbname='.$config['dbname'],
            $config['user'], $config['password'] );
    }
}