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
     * @var \Database\Database
     */
    private $_db;

    /**
     * Konstruktor klasy Patients
     */
    public function __construct($db) {
        $this->_db = $db;
    }

    /**
     * Konwersja beana do tablici asocjacyjnej
     *
     * @param $patientDB bean
     * @return array
     * @throws \Exception
     */
    public function _makePatient($patientDB) {
        if(!isset($patientDB->id) || !isset($patientDB->name) || !isset($patientDB->surname) || !isset($patientDB->email) || !isset($patientDB->type) || !isset($patientDB->pesel)) {
            if(isset($patientDB->type) && $patientDB->type !== 'patient') {
                throw new \Exception("It's not a patient");
            }
            throw new \Exception('Some of required values not passed');
        }

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
    public function _getAllPatients() {
        $patientsDB = $this->_db->findAllPatients();
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

    /**
     * Sprawdza czy podane id i typ to pacjent
     *
     * Funkcja mająca na celu czy jednostka o podanym id i typie to pacjent
     *
     * @param $id int Id pacjenta
     * @param $type string Typ pacjenta
     *
     * @return Bool
     */
    public function _ifFoundPatient($id, $type) {
        if($id === 0 || $type !== 'patient') {
            return false;
        }

        return true;
    }

    /**
     * Obsługa calla GET /patients/{id}
     *
     * Call służący do pobrania pacjenta z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getPatient($request, $response, $args) {

        $id = $args['id'];

        $patientDB = $this->_db->loadUserById($id);

        if(!$this->_ifFoundPatient($patientDB->id, $patientDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Patient not found']);
        }

        return $response->withJson($this->_makePatient($patientDB));
    }

    /**
     * Obsługa calla POST /patients
     *
     * Call służący do dodawania pacjenta
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function addPatient($request, $response, $args) {
        $patientBean = \R::dispense('user');

        $patientBean->name = $request->getParam('name');
        $patientBean->surname = $request->getParam('surname');
        $patientBean->email = $request->getParam('email');
        $patientBean->password = $request->getParam('password');
        $patientBean->pesel = $request->getParam('pesel');
        $patientBean->type = 'patient';

        \R::store($patientBean);
        return $response->withJson([]);
    }

    /**
     * Metoda wywołująca metodę z Database, która ma usunąć pacjenta z bazy danych
     *
     * @param $id int id pacjenta
     *
     * @return bool
     */
    public function trashPatient($id) {
        $patientDB = $this->_db->loadUserById($id);

        if($this->_ifFoundPatient($patientDB->id, $patientDB->type)) {
            $this->_db->trash($patientDB);
            return true;
        }

        return false;
    }

    /**
     * Obsługa calla DELETE /patients/{id}
     *
     * Call służący do usuwania pacjenta z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function deletePatient($request, $response, $args) {

        $id = $args['id'];

        if($this->trashPatient($id)) {
            return $response->withJson([]);
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Patient not found']);
    }

    /**
     * Obsługa calla PUT /patients/{id}
     *
     * Call służący do edytowania pacjenta
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function editPatient($request, $response, $args) {
        $id = $args['id'];
        $patientDB = \R::load( 'user', $id );

        if(!$this->_ifFoundPatient($patientDB->id, $patientDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Patient not found']);
        }

        $patientDB->name = $request->getParam('name');
        $patientDB->surname = $request->getParam('surname');
        $patientDB->email = $request->getParam('email');
        $patientDB->pesel = $request->getParam('pesel');
        $patientDB->type = 'patient';

        \R::store($patientDB);
        return $response->withJson([]);
    }

    public function _makeVisit($visitDB) {
        if(!isset($visitDB->id) || !isset($visitDB->from) || !isset($visitDB->to)) {
            throw new \Exception('Some of required values not passed');
        }

        $patientId = null;
        $doctorId = null;
        foreach($visitDB->sharedUserList as $user) {
            if ($user->type == 'patient') {
                $patientId = $user->id;
            }
            if ($user->type == 'doctor') {
                $doctorId = $user->id;
            }
        }

        $visit = [];
        $visit['id'] = $visitDB->id;
        $visit['doctor_id'] = $doctorId;
        $visit['patient_id'] = $patientId;
        $visit['from'] = \Utilities\Date::convertISOToRFC3339Format($visitDB->from);
        $visit['to'] = \Utilities\Date::convertISOToRFC3339Format($visitDB->to);

        return $visit;
    }

    public function getPatientVisits($request, $response, $args) {
        $patientId = $args['id'];
        $patientDB = \R::load( 'user', $patientId);

        if(!$this->_ifFoundPatient($patientDB->id, $patientDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Patient not found']);
        }

        $result = [];
        foreach($patientDB->sharedVisit as $workHours) {
            $result[] = $this->_makeVisit($workHours);
        };

        return $response->withJson($result);
    }
}