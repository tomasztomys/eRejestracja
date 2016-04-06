<?php

namespace Calls;


class User
{
    protected $ci;

    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    public function user($request, $response, $args) {
        $userData = [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'pesel' => '94050112153',
            'type' => 'doctor',
            'specialization' => 'chirurg'
        ];
        return $response->withJson($userData);
    }
}