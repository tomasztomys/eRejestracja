<?php

namespace Calls;

/**
 * Grupa calli /user
 *
 * @package Calls
 */
class User
{
    /**
     * @var \Slim\Container
     */
    protected $ci;

    /**
     * Konstuktor klasy User
     *
     * @param \Slim\Container $ci
     */
    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    /**
     * Metoda do obsługi calla GET /user
     *
     * Zwraca listę użytkowników
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
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