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
    private $_host = 'localhost:3306';
    /**
     * @var string
     */
    private $_dbname = 'iwm';
    /**
     * @var string
     */
    private $_user = 'iwm';
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