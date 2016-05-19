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

    /**
     * Pobranie wszystkich lekarzy z bazy
     *
     * @return array
     */
    public function findAllDoctors() {
        return \R::findAll( 'user', ' type = ? ', [ 'doctor' ] );
    }

    /**
     * Pobranie wszystkich pacjentów z bazy
     *
     * @return array
     */
    public function findAllPatients() {
        return \R::findAll( 'user', 'type = ? ', [ 'patient' ] );
    }

    /**
     * Pobranie wszystkich administratorów z bazy
     *
     * @return array
     */
    public function findAllAdmins() {
        return \R::findAll( 'user', ' type = ? ', [ 'admin' ] );
    }

    /**
     * Pobranie usera z bazy
     *
     * @param $id bean
     * @return array
     */
    public function loadUserById($id) {
        return \R::load( 'user', $id);
    }

    /**
     * Usuwanie beana z bazy
     *
     * @param $bean bean
     */
    public function trash($bean) {
        \R::trash($bean);
    }
}