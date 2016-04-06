<?php

namespace Calls;


class Doctors
{
    protected $ci;

    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    public function getDoctors($request, $response, $args) {
        $doctor1 = [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'pesel' => '94050112153',
            'type' => 'doctor',
            'specialization' => 'chirurg'
        ];
        $doctor2 = [
            'id' => 3,
            'name' => 'Dariusz',
            'surname' => 'Paluch',
            'email' => 'dariusz.paluch@hotmail.com',
            'pesel' => '94011532198',
            'type' => 'doctor',
            'specialization' => 'stomatolog'
        ];

        $params = $request->getParams();
        switch($params['specialization']){
            case 'chirurg':
                $doctors = [
                    'doctors' => [$doctor1]
                ];
                break;
            case 'stomatolog':
                $doctors = [
                    'doctors' => [$doctor2]
                ];
                break;
            case null:
                $doctors = [
                    'doctors' => [$doctor1, $doctor2]
                ];
                break;
            default:
                $doctors = [
                    'doctors' => []
                ];
        }

        return $response->withJson($doctors);
    }
}