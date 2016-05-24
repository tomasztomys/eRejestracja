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
        $visit['remainded'] = $visitDB->remainded;

        return $visit;
    }

    public function getVisits($request, $response, $args) {
        $visitsDB = \R::findAll('visit');
        $visits = [];
        $visitsFromDB = (array) $visitsDB;
        uasort($visitsFromDB, array($this, 'cmp'));
        foreach($visitsFromDB as $visitDB) {
            $visit = $this->_makeVisit($visitDB);
            array_push($visits, $visit);
        }

        return $response->withJson($visits);
    }

    public function cmp($a, $b) {
        if ($a->from == $b->from) {
            return 0;
        }
        return ($a->from < $b->from) ? -1 : 1;
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
        $visitBean->remainded = '0';
        $visitBean->sharedUserList = [$patientDB, $doctorDB];

        \R::store($visitBean);

        return $response->withJson([]);
    }

    public function deleteVisit($request, $response, $args) {

        $id = $args['id'];
        $params = $request->getParams();
        $visitDB = \R::load( 'visit', $id );

        if($visitDB->id > 0) {

            if(isset($params['mail_notification']) && $params['mail_notification'] == "1") {
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
                $patientDB = \R::load('user', $patientId);
                $doctorDB = \R::load('user', $doctorId);
                $visitTime = $visitDB->from;
                $visitTimeTo = $visitDB->to;
                $headers = "MIME-Version: 1.0" . "\r\n" .
                    "Content-type: text/html; charset=UTF-8" . "\r\n";
                mail($patientDB->email, 'eRejestracja - Anulowanie wizyty', "Witaj $patientDB->name $patientDB->surname!<br /><br />Informujemy, że Twoja wizyta u lekarza $doctorDB->name $doctorDB->surname w ustalonym terminie: od $visitTime do $visitTimeTo, została anulowana.<br />Przepraszamy i prosimy o ponowne ustalenie wizyty lub kontakt z lekarzem.<br /><br />Pozdrawiamy,<br />Zespół eRejestracja", $headers);

            }
            \R::trash($visitDB);
            return $response->withJson([]);
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Visit not found']);
    }
}