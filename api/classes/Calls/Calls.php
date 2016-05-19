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

        $db = new \Database\Database();

        $this->_app->group('/authorizations', function () {
            $this->post('', '\Calls\Authorizations:authorizations')->setName('authorizations');
        });

        $this->_app->group('/user', function () {
            $this->get('', '\Calls\User:user')->setName('user');
          $this->put('/{id:[0-9]+}/password', '\Calls\User:changePassword')->setName('changePassword');
        });

        $this->_app->group('/doctors', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->getDoctors($request, $response, $args); })->setName('getDoctors');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->getDoctor($request, $response, $args); })->setName('getDoctor');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->deleteDoctor($request, $response, $args); })->setName('deleteDoctor');
            $this->post('', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->addDoctor($request, $response, $args); })->setName('addDoctor');
            $this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->editDoctor($request, $response, $args); })->setName('editDoctor');
        });

        $this->_app->group('/patients', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->getPatients($request, $response, $args); })->setName('getPatients');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->getPatient($request, $response, $args); })->setName('getPatient');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->deletePatient($request, $response, $args); })->setName('deletePatient');
            $this->post('', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->addPatient($request, $response, $args); })->setName('addPatient');
            $this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->editPatient($request, $response, $args); })->setName('editPatient');
        });

        $this->_app->group('/admins', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->getAdmins($request, $response, $args); })->setName('getAdmins');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->getAdmin($request, $response, $args); })->setName('getAdmin');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->deleteAdmin($request, $response, $args); })->setName('deleteAdmin');
            $this->post('', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->addAdmin($request, $response, $args); })->setName('addAdmin');
            $this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->editAdmin($request, $response, $args); })->setName('editAdmin');
        });

        $this->_app->post('/reset', '\Database\Reset:run')->setName('resetDatabase');

        $this->_app->any('/', function () {
            echo "eRejestracja";
        });
    }
}