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
    private function _makeDoctor($doctorDB) {
        $doctor = [];
        $doctor['id'] = (int)$doctorDB->id;
        $doctor['name'] = $doctorDB->name;
        $doctor['surname'] = $doctorDB->surname;
        $doctor['email'] = $doctorDB->email;
        $doctor['pesel'] = $doctorDB->pesel;
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
        $doctorsDB = \R::findAll( 'doctor' );
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
        $doctorsDB = \R::findAll( 'doctor', ' specialization = ? ', [ $specialization ] );
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
        $doctorDB = \R::load( 'doctor', $id );

        if($doctorDB->id !== 0) {
            \R::trash($doctorDB);
            return $response->withJson([]);
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Doctor not found']);
    }
}