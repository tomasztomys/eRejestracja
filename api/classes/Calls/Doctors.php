<?php

namespace Calls;


class Doctors
{
    protected $ci;

    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    public function getDoctors($request, $response, $args) {
        $doctors = [
            'doctors' => [
                [
                    'id' => 1,
                    'name' => 'Tomasz',
                    'surname' => 'Tomys',
                    'email' => 'tomasz@tomys.pl',
                    'pesel' => '94050112153',
                    'type' => 'doctor'
                ],
                [
                    'id' => 3,
                    'name' => 'Dariusz',
                    'surname' => 'Paluch',
                    'email' => 'dariusz.paluch@hotmail.com',
                    'pesel' => '94011532198',
                    'type' => 'doctor'
                ]
            ]
        ];
        return $response->withJson($doctors);
    }
}