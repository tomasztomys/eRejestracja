<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 16.04.2016
 * Time: 23:50
 */

namespace Calls;


class Calls
{
    private $_app;

    function __construct($app)
    {
        $this->_app = $app;
    }

    public function run() {
        $this->_app->group('/authorizations', function () {
            $this->post('', '\Calls\Authorizations:authorizations')->setName('authorizations');
        });

        $this->_app->group('/user', function () {
            $this->get('', '\Calls\User:user')->setName('user');
        });

        $this->_app->group('/doctors', function () {
            $this->get('', '\Calls\Doctors:getDoctors')->setName('getDoctors');
        });

        $this->_app->post('/reset', '\Database\Reset:run')->setName('resetDatabase');

        $this->_app->any('/', function () {
            echo "eRejestracja";
        });
    }
}