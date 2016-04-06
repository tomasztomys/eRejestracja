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
        $doctors = [
            'doctors' => [ $doctor1, $doctor2 ]
        ];
        return $response->withJson($doctors);
    }
}