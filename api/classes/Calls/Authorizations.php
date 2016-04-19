<?php

namespace Calls;

/**
 * Grupa calli /authorizations
 *
 * @package Calls
 */
class Authorizations
{
    /**
     * @var \Slim\Container
     */
    protected $ci;

    /**
     * Konsturktor klasy Authorizations
     *
     * @param \Slim\Container $ci
     */
    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    /**
     * Obsługa calla POST /authorizations
     *
     * Call służący do autoryzacji użytkownika
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function authorizations($request, $response, $args) {
        if($request->getParam('email') === 'tomasz@tomys.pl' && $request->getParam('password') === 'tomasz') {
            return $response->withJson(['login' => true]);
        } else {
            $newResponse = $response->withStatus(422);
            return $newResponse->withJson(['login' => false]);
        }
    }
}