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
    public function _makePatient($patientDB) {
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
        $patientsDB = \R::findAll( 'user', 'type = ? ', [ 'patient' ] );
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

        $patientDB = \R::load( 'user', $id);

        if($patientDB->id === 0 || $patientDB->type !== 'patient') {
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
        $patientDB = \R::load( 'user', $id );

        if($patientDB->id !== 0 && $patientDB->type === 'patient') {
            \R::trash($patientDB);
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

        if($patientDB->id === 0 || $patientDB->type !== 'patient') {
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
}