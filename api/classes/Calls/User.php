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
     * Metoda do obsługi calla GET /user/{id}/password
     *
     * Zmiana hasła użytkownika
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function changePassword($request, $response, $args) {

        $id = $args['id'];
        $old_password = $request->getParam('old_password');
        $new_password = $request->getParam('new_password');
        $user = \R::load( 'user', $id );

        if($user->id === 0) {
            return $response->withJson(['error' => 'User not found']);
        }

        if($old_password === $user->password) {
            $user->password = $new_password;
            \R::store($user);
            return $response->withJson([]);
        } else {
            return $response->withJson(['old_password' => 'is wrong']);
        }
    }
}