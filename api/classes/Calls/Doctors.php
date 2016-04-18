<?php

namespace Calls;


class Doctors
{
    protected $ci;

    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    private function _makeDoctor($doctorDB) {
        $doctor = [];
        $doctor['name'] = $doctorDB->name;
        $doctor['surname'] = $doctorDB->surname;
        $doctor['email'] = $doctorDB->email;
        $doctor['pesel'] = $doctorDB->pesel;
        $doctor['type'] = $doctorDB->type;
        $doctor['specialization'] = $doctorDB->specialization;

        return $doctor;
    }

    private function _getAllDoctors() : array {
        $doctorsDB = \R::findAll( 'doctor' );
        $doctors = [];
        foreach($doctorsDB as $doctorDB) {
            $doctor = $this->_makeDoctor($doctorDB);
            array_push($doctors, $doctor);
        }

        return $doctors;
    }

    private function _getDoctorsBySpecialization($specialization) : array {
        $doctorsDB = \R::findAll( 'doctor', ' specialization = ? ', [ $specialization ] );
        $doctors = [];
        foreach($doctorsDB as $doctorDB) {
            $doctor = $this->_makeDoctor($doctorDB);
            array_push($doctors, $doctor);
        }

        return $doctors;
    }

    public function getDoctors($request, $response, $args) {

        $params = $request->getParams();
        $specialization = $params['specialization'] ?? null;
        if (!isset($specialization)) {
            $doctors = $this->_getAllDoctors();
        } else {
            $doctors = $this->_getDoctorsBySpecialization($specialization);
        }
        return $response->withJson($doctors);
    }
}