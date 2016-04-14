<?php
namespace Configs;


class Config
{
    private $_host = 'localhost:3306';
    private $_dbname = 'iwm';
    private $_user = 'iwm';
    private $_password = 'IwM123456';


    public function __construct() {
        $database = new \Database\Database();
        $database->connect($this->getDbConfig());

    }
    public function getDbConfig() {
        return [
          'host' => $this->_host,
          'dbname' => $this->_dbname,
          'user' => $this->_user,
          'password' => $this->_password
        ];
    }
}