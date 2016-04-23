<?php

namespace Calls;

/**
 * Grupa calli /patients
 *
 * @package Calls
 */
class Patients
{
    /**
     * @var \Slim\Container
     */
    protected $ci;

    /**
     * Konstruktor klasy Patients
     *
     * @param \Slim\Container $ci
     */
    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    /**
     * Konwersja beana do tablici asocjacyjnej
     *
     * @param $patientDB bean
     *
     * @return array
     */
    private function _makePatient($patientDB) {
        $patient = [];
        $patient['id'] = (int)$patientDB->id;
        $patient['name'] = $patientDB->name;
        $patient['surname'] = $patientDB->surname;
        $patient['email'] = $patientDB->email;
        $patient['pesel'] = $patientDB->pesel;
        $patient['type'] = $patientDB->type;

        return $patient;
    }

    /**
     * Pobranie wszystkich pacjentow z bazy i przedstawienie w formie tabeli
     *
     * @return array
     */
    private function _getAllPatients() {
        $patientsDB = \R::findAll( 'patient' );
        $patients = [];
        foreach($patientsDB as $patientDB) {
            $patient = $this->_makePatient($patientDB);
            array_push($patients, $patient);
        }

        return $patients;
    }

    /**
     * Obsługa calla GET /patients
     *
     * Call służący do pobrania wszystkich pacjentow z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getPatients($request, $response, $args) {

        $patients = $this->_getAllPatients();

        return $response->withJson($patients);
    }

}