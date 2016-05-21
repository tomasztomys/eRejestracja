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
}