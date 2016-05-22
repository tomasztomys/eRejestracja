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
     * @var \Database\Database
     */
    private $_db;

    /**
     * Konstruktor klasy Doctors
     *
     */
    public function __construct($db) {
        $this->_db = $db;
    }

    /**
     * Konwersja beana do tablici asocjacyjnej
     *
     * @param $doctorDB bean
     * @return array
     *
     * @throws \Exception
     */
    public function _makeDoctor($doctorDB) {
        if(!isset($doctorDB->id) || !isset($doctorDB->name) || !isset($doctorDB->surname) || !isset($doctorDB->email) || !isset($doctorDB->type) || !isset($doctorDB->specialization)) {
            if(isset($doctorDB->type) && $doctorDB->type !== 'doctor') {
                throw new \Exception("It's not a doctor");
            }
            throw new \Exception('Some of required values not passed');
        }

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
    public function _getAllDoctors() {
        $doctorsDB = $this->_db->findAllDoctors();
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
    public function _getDoctorsBySpecialization($specialization) {
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
     * Sprawdza czy podane id i typ to lekarz
     *
     * Funkcja mająca na celu czy jednostka o podanym id i typie to lekarz
     *
     * @param $id int Id lekarza
     * @param $type string Typ lekarza
     *
     * @return Bool
     */
    public function _ifFoundDoctor($id, $type) {
        if($id === 0 || $type !== 'doctor') {
            return false;
        }

        return true;
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

        $doctorDB = $this->_db->loadUserById($id);

        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
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

        if($this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
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

        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        $doctorDB->name = $request->getParam('name');
        $doctorDB->surname = $request->getParam('surname');
        $doctorDB->email = $request->getParam('email');
        $doctorDB->specialization = $request->getParam('specialization');
        $doctorDB->type = 'doctor';

        \R::store($doctorDB);
        return $response->withJson([]);
    }

    public function addWorkHours($request, $response, $args) {
        $doctorId = $args['id'];
        $doctorDB = \R::load( 'user', $doctorId);

        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        $from = $request->getParam('from');
        $to = $request->getParam('to');

        $workhoursDB = \R::dispense('workhours');

        $from = \Utilities\Date::convertRFC3339ToISOFormat($from);
        $to = \Utilities\Date::convertRFC3339ToISOFormat($to);
        $workhoursDB->from = $from;
        $workhoursDB->to = $to;

        $doctorDB->noLoad()->ownWorkhoursList[] = $workhoursDB;

        \R::store($doctorDB);

        return $response->withJson([]);
    }

    public function _makeWorkHours($workHoursDB) {
        if(!isset($workHoursDB->id) || !isset($workHoursDB->from) || !isset($workHoursDB->to)) {
            throw new \Exception('Some of required values not passed');
        }

        $doctor = [];
        $doctor['id'] = $workHoursDB->id;
        $doctor['doctor_id'] = $workHoursDB->user_id;
        $doctor['from'] = \Utilities\Date::convertISOToRFC3339Format($workHoursDB->from);
        $doctor['to'] = \Utilities\Date::convertISOToRFC3339Format($workHoursDB->to);

        return $doctor;
    }

    public function cmpWorkHours($a, $b) {
        if ($a->from == $b->from) {
            return 0;
        }
        return ($a->from < $b->from) ? -1 : 1;
    }

    public function getWorkHours($request, $response, $args) {
        $doctorId = $args['id'];
        $doctorDB = \R::load( 'user', $doctorId);

        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        $result = [];
        $workHoursFromDB = (array) $doctorDB->ownWorkhoursList;
        uasort($workHoursFromDB, array($this, 'cmpWorkHours'));
        foreach($workHoursFromDB as $workHours) {
            $result[] = $this->_makeWorkHours($workHours);
        };

        return $response->withJson($result);
    }

    public function deleteWorkHoursId($request, $response, $args) {

        $id = $args['id'];
        $workHoursId = $args['work_hours_id'];
        $doctorDB = \R::load( 'user', $id );

        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        foreach($doctorDB->ownWorkhoursList as $workHours) {
            if($workHours->id == $workHoursId) {
                \R::trash($workHours);
                return $response->withJson([]);
            }
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Work hours not found']);
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
        $visit['remainded'] = $visitDB->remainded;

        return $visit;
    }

    public function getDoctorVisits($request, $response, $args) {
        $doctorId = $args['id'];
        $doctorDB = \R::load( 'user', $doctorId);

        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        $result = [];
        foreach($doctorDB->sharedVisit as $visit) {
            $result[] = $this->_makeVisit($visit);
        };

        return $response->withJson($result);
    }
}