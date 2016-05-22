<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 21.05.2016
 * Time: 20:13
 */

namespace Remainder;


class Remainder
{
    public function run($request, $response, $args) {
        $now = date_create();
        $now = $now->setTimestamp(time());
        $nowtime = date_format($now, \DateTime::RFC3339);
        $nowtime = \Utilities\Date::convertRFC3339ToISOFormat($nowtime);
        $timeToRemind = date_add($now, date_interval_create_from_date_string('1 day'));
        $timeToRemind = date_format($timeToRemind, \DateTime::RFC3339);
        $timeToRemind = \Utilities\Date::convertRFC3339ToISOFormat($timeToRemind);

        $visitsToRemaind = \R::findAll('visit', ' `from` < :time AND `from` > :now AND `remainded` = :remainded', [ 'time' => $timeToRemind, 'now' => $nowtime, 'remainded' => '0' ]);
        $result = [];
        foreach($visitsToRemaind as $visitToRemaind) {


            $patientId = null;
            $doctorId = null;
            foreach($visitToRemaind->sharedUserList as $user) {
                if ($user->type == 'patient') {
                    $patientId = $user->id;
                }
                if ($user->type == 'doctor') {
                    $doctorId = $user->id;
                }
            }
            $patientDB = \R::load('user', $patientId);
            $doctorDB = \R::load('user', $doctorId);

            $visitTime = $visitToRemaind->from;
            $visitTimeTo = $visitToRemaind->to;
            $headers = "MIME-Version: 1.0" . "\r\n" .
                "Content-type: text/html; charset=UTF-8" . "\r\n";
            $mailStatus = mail($patientDB->email, 'eRejestracja - Przypomnienie o wizycie', "Witaj $patientDB->name $patientDB->surname!<br /><br />Przypominamy o wizycie u lekarza $doctorDB->name $doctorDB->surname w ustalonym terminie: od $visitTime do $visitTimeTo.<br /><br />Pozdrawiamy,<br />Zespół eRejestracja", $headers);

            if($mailStatus) {
                $visitToRemaind->remainded = $nowtime;
                \R::store($visitToRemaind);
            } else {
                $result[$visitToRemaind->id] = ['send_mail' => 'error'];
            }
        }

        $response->withJson($result);
    }
}