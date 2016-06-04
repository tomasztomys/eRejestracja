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
            $this->get('/confirm_email', '\Calls\User:confirmEmail')->setName('confirmEmail');
            $this->post('/new_password', '\Calls\User:newPassword')->setName('newPassword');
            $this->put('/{id:[0-9]+}/password', '\Calls\User:changePassword')->setName('changePassword');
            $this->get('/{id:[0-9]+}/reset_password', '\Calls\User:resetPassword')->setName('resetPassword');
        });

        $this->_app->group('/institute', function () {
            $this->get('', '\Calls\Institute:getInstitute')->setName('getInstitute');
            $this->put('', '\Calls\Institute:editInstitute')->setName('editInstitute');
        });

        $this->_app->group('/doctors', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->getDoctors($request, $response, $args); })->setName('getDoctors');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->getDoctor($request, $response, $args); })->setName('getDoctor');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->deleteDoctor($request, $response, $args); })->setName('deleteDoctor');
            $this->post('', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->addDoctor($request, $response, $args); })->setName('addDoctor');
            $this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->editDoctor($request, $response, $args); })->setName('editDoctor');

            $this->post('/{id:[0-9]+}/work_hours', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->addWorkHours($request, $response, $args); })->setName('addWorkHours');
            $this->get('/{id:[0-9]+}/work_hours', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->getWorkHours($request, $response, $args); })->setName('getWorkHours');
            $this->delete('/{id:[0-9]+}/work_hours/{work_hours_id:[0-9]+}', function($request, $response, $args) use ($db) { $doctors = new \Calls\Doctors($db); $doctors->deleteWorkHoursId($request, $response, $args); })->setName('deleteWorkHoursId');

            $this->get('/{id:[0-9]+}/visits', function($request, $response, $args) use ($db) { $patients = new \Calls\Doctors($db); $patients->getDoctorVisits($request, $response, $args); })->setName('getDoctorVisits');
        });

        $this->_app->group('/patients', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->getPatients($request, $response, $args); })->setName('getPatients');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->getPatient($request, $response, $args); })->setName('getPatient');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->deletePatient($request, $response, $args); })->setName('deletePatient');
            $this->post('', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->addPatient($request, $response, $args); })->setName('addPatient');
            $this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->editPatient($request, $response, $args); })->setName('editPatient');

            $this->get('/{id:[0-9]+}/visits', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->getPatientVisits($request, $response, $args); })->setName('getPatientVisits');
        });

        $this->_app->group('/visits', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $patients = new \Calls\Visits($db); $patients->getVisits($request, $response, $args); })->setName('getVisits');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Visits($db); $patients->getVisit($request, $response, $args); })->setName('getVisit');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Visits($db); $patients->deleteVisit($request, $response, $args); })->setName('deleteVisit');
            $this->post('', function($request, $response, $args) use ($db) { $patients = new \Calls\Visits($db); $patients->addVisit($request, $response, $args); })->setName('addVisit');
            //$this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $patients = new \Calls\Patients($db); $patients->editPatient($request, $response, $args); })->setName('editPatient');
        });

        $this->_app->group('/admins', function () use ($db) {
            $this->get('', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->getAdmins($request, $response, $args); })->setName('getAdmins');
            $this->get('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->getAdmin($request, $response, $args); })->setName('getAdmin');
            $this->delete('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->deleteAdmin($request, $response, $args); })->setName('deleteAdmin');
            $this->post('', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->addAdmin($request, $response, $args); })->setName('addAdmin');
            $this->put('/{id:[0-9]+}', function($request, $response, $args) use ($db) { $admins = new \Calls\Admins($db); $admins->editAdmin($request, $response, $args); })->setName('editAdmin');
        });

        $this->_app->get('/remainder', '\Remainder\Remainder:run')->setName('remainder');

        $this->_app->post('/reset', '\Database\Reset:run')->setName('resetDatabase');

        $this->_app->any('/', function () {
            echo "eRejestracja";
        });
    }
}