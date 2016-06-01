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
        $email = $request->getParam('email');
        $password = $request->getParam('password');

        $user = \R::findOne('user', ' email = ? && password = ?', [ $email, $password ] );

        if($user !== null && $user->email_confirmed) {
            $entityClass = '\Calls\\'.ucfirst($user->type).'s';
            $method = '_make'.ucfirst($user->type);
            $userArray = $entityClass::$method($user);
            return $response->withJson(['login' => true, 'user' => $userArray]);
        } else {
            $newResponse = $response->withStatus(422);
            $result = [
                'login' => false
            ];
            if(!$user->email_confirmed) {
                $result['error'] = 'Email hasn\'t confirmed yet.';
            }
            return $newResponse->withJson($result);
        }
    }
}