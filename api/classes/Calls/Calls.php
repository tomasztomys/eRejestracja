<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 16.04.2016
 * Time: 23:50
 */

namespace Calls;

/**
 * Klasa-router calli
 *
 * @package Calls
 */
class Calls
{
    /**
     * @var \Slim\App
     */
    private $_app;

    /**
     * Konstruktor klasy Calls
     *
     * @param $app \Slim\App
     */
    function __construct($app)
    {
        $this->_app = $app;
    }

    /**
     * Ustawienie routera calli aplikacji
     *
     * @return void
     */
    public function run() {
        $this->_app->group('/authorizations', function () {
            $this->post('', '\Calls\Authorizations:authorizations')->setName('authorizations');
        });

        $this->_app->group('/user', function () {
            $this->get('', '\Calls\User:user')->setName('user');
        });

        $this->_app->group('/doctors', function () {
            $this->get('', '\Calls\Doctors:getDoctors')->setName('getDoctors');
            $this->delete('/{id:[0-9]+}', '\Calls\Doctors:deleteDoctor')->setName('deleteDoctor');
        });

        $this->_app->group('/patients', function () {
            $this->get('', '\Calls\Patients:getPatients')->setName('getPatients');
            $this->delete('/{id:[0-9]+}', '\Calls\Patients:deletePatient')->setName('deletePatient');
        });

        $this->_app->post('/reset', '\Database\Reset:run')->setName('resetDatabase');

        $this->_app->any('/', function () {
            echo "eRejestracja";
        });
    }
}