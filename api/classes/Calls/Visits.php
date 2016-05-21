<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 21.05.2016
 * Time: 18:57
 */

namespace Calls;


class Visits
{
    public function __construct($db) {
        $this->_db = $db;
    }

    public function _ifFoundDoctor($id, $type) {
        if($id === 0 || $type !== 'doctor') {
            return false;
        }

        return true;
    }

    public function _ifFoundPatient($id, $type) {
        if($id === 0 || $type !== 'patient') {
            return false;
        }

        return true;
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

    public function getVisits($request, $response, $args) {
        $visitsDB = \R::findAll('visit');
        $visits = [];
        foreach($visitsDB as $visitDB) {
            $visit = $this->_makeVisit($visitDB);
            array_push($visits, $visit);
        }

        return $response->withJson($visits);
    }

    public function getVisit($request, $response, $args) {
        $visitId = $args['id'];
        $visitDB = \R::load( 'visit', $visitId);

        if($visitDB->id === 0) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Visit not found']);
        }

        $result = $this->_makeVisit($visitDB);

        return $response->withJson($result);
    }

    public function addVisit($request, $response, $args) {
        $patientId = $request->getParam('patient_id');
        $doctorId= $request->getParam('doctor_id');

        $patientDB = \R::load( 'user', $patientId );
        if(!$this->_ifFoundPatient($patientDB->id, $patientDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Patient not found']);
        }

        $doctorDB = \R::load( 'user', $doctorId);
        if(!$this->_ifFoundDoctor($doctorDB->id, $doctorDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Doctor not found']);
        }

        $visitBean = \R::dispense('visit');
        $visitBean->from = \Utilities\Date::convertRFC3339ToISOFormat($request->getParam('from'));
        $visitBean->to = \Utilities\Date::convertRFC3339ToISOFormat($request->getParam('to'));
        $visitBean->sharedUserList = [$patientDB, $doctorDB];

        \R::store($visitBean);

        return $response->withJson([]);
    }

    public function deleteVisit($request, $response, $args) {

        $id = $args['id'];
        $visitDB = \R::load( 'visit', $id );

        if($visitDB->id > 0) {
            \R::trash($visitDB);
            return $response->withJson([]);
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Visit not found']);
    }
}