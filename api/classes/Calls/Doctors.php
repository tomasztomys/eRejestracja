<?php

namespace Calls;

/**
 * Grupa calli /doctors
 *
 * @package Calls
 */
class Doctors
{
    /**
     * @var \Slim\Container
     */
    protected $ci;

    /**
     * Konstruktor klasy Doctors
     *
     * @param \Slim\Container $ci
     */
    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    /**
     * Konwersja beana do tablici asocjacyjnej
     *
     * @param $doctorDB bean
     *
     * @return array
     */
    public function _makeDoctor($doctorDB) {
        $doctor = [];
        $doctor['id'] = (int)$doctorDB->id;
        $doctor['name'] = $doctorDB->name;
        $doctor['surname'] = $doctorDB->surname;
        $doctor['email'] = $doctorDB->email;
        $doctor['type'] = $doctorDB->type;
        $doctor['specialization'] = $doctorDB->specialization;

        return $doctor;
    }

    /**
     * Pobranie wszystkich lekarzy z bazy i przedstawienie w formie tabeli
     *
     * @return array
     */
    private function _getAllDoctors() {
        $doctorsDB = \R::findAll( 'user', ' type = ? ', [ 'doctor' ] );
        $doctors = [];
        foreach($doctorsDB as $doctorDB) {
            $doctor = $this->_makeDoctor($doctorDB);
            array_push($doctors, $doctor);
        }

        return $doctors;
    }

    /**
     * Filtrowanie lekarzy po specjalizacji
     *
     * @param $specialization string specjalizacja
     *
     * @return array
     */
    private function _getDoctorsBySpecialization($specialization) {
        $doctorsDB = \R::findAll( 'user', ' specialization = ? && type = ? ', [ $specialization, 'doctor' ] );
        $doctors = [];
        foreach($doctorsDB as $doctorDB) {
            $doctor = $this->_makeDoctor($doctorDB);
            array_push($doctors, $doctor);
        }

        return $doctors;
    }

    /**
     * Obsługa calla GET /doctors
     *
     * Call służący do pobrania wszystkich lekarzy z bazy danych z opcjonalną filtracją po nazwie specjalizacji
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getDoctors($request, $response, $args) {

        $params = $request->getParams();
        if(isset($params['specialization'])) {
            $specialization = $params['specialization'];
        } else {
            $specialization = null;
        }
        if (!isset($specialization)) {
            $doctors = $this->_getAllDoctors();
        } else {
            $doctors = $this->_getDoctorsBySpecialization($specialization);
        }
        return $response->withJson($doctors);
    }

    /**
     * Obsługa calla GET /doctors/{id}
     *
     * Call służący do pobrania lekarza z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getDoctor($request, $response, $args) {

        $id = $args['id'];

        $doctorDB = \R::load( 'user', $id);

        if($doctorDB->id === 0 || $doctorDB->type !== 'doctor') {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        return $response->withJson($this->_makeDoctor($doctorDB));
    }

    /**
     * Obsługa calla DELETE /doctors/{id}
     *
     * Call służący do usuwania lekarza z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function deleteDoctor($request, $response, $args) {

        $id = $args['id'];
        $doctorDB = \R::load( 'user', $id );

        if($doctorDB->id !== 0 && $doctorDB->type === 'doctor') {
            \R::trash($doctorDB);
            return $response->withJson([]);
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Doctor not found']);
    }

    /**
     * Obsługa calla POST /doctors
     *
     * Call służący do dodawania doktora
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function addDoctor($request, $response, $args) {
        $doctorBean = \R::dispense('user');

        $doctorBean->name = $request->getParam('name');
        $doctorBean->surname = $request->getParam('surname');
        $doctorBean->email = $request->getParam('email');
        $doctorBean->password = $request->getParam('password');
        $doctorBean->specialization = $request->getParam('specialization');
        $doctorBean->type = 'doctor';

        \R::store($doctorBean);
        return $response->withJson([]);
    }

    /**
     * Obsługa calla PUT /doctors/{id}
     *
     * Call służący do edytowania doktora
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function editDoctor($request, $response, $args) {
        $id = $args['id'];
        $doctorDB = \R::load( 'user', $id );

        if($doctorDB->id === 0 || $doctorDB->type !== 'doctor') {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        $doctorDB->name = $request->getParam('name');
        $doctorDB->surname = $request->getParam('surname');
        $doctorDB->email = $request->getParam('email');
        $doctorDB->password = $request->getParam('password');
        $doctorDB->specialization = $request->getParam('specialization');
        $doctorDB->type = 'doctor';

        \R::store($doctorDB);
        return $response->withJson([]);
    }
}