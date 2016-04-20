<?php

namespace Configs;

/**
 * Konfiguracja aplikacji
 *
 * Klasa przechowująca informacje o konfiguracji aplikacji
 *
 * @package Configs
 */
class Config
{
    /**
     * @var string
     */
    private $_host = 'mysql6.mydevil.net';
    /**
     * @var string
     */
    private $_dbname = 'm1510_iwm';
    /**
     * @var string
     */
    private $_user = 'm1510_iwm';
    /**
     * @var string
     */
    private $_password = 'IwM123456';


    /**
     * Konstruktor klasy Config
     */
    public function __construct() {
        $database = new \Database\Database();
        $database->connect($this->getDbConfig());
    }

    /**
     *  Pobieranie danych konfiguracyjnych bazy danych
     *
     *  Metoda służy do pobrania tablicy z danymi konfiguracyjnymi bazy danych
     *
     *  @return array
     */
    public function getDbConfig() {
        return [
          'host' => $this->_host,
          'dbname' => $this->_dbname,
          'user' => $this->_user,
          'password' => $this->_password
        ];
    }
}