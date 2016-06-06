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
     * Metoda do obsługi calla POST /user/{id}/password
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

    /**
     * Metoda do obsługi calla POST /user/{id}/new_password
     *
     * Ustalenie nowego hasła użytkownika
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function newPassword($request, $response, $args) {

        $token= $request->getParam('token');
        $new_password = $request->getParam('new_password');
        $user = \R::findOne( 'user', ' reset_password_token = ? ', [ $token ] );

        if($user === null) {
            return $response->withJson(['error' => 'Token invalid']);
        }

        $user->password = $new_password;
        $user->reset_password_token = null;
        \R::store($user);
        return $response->withJson([]);
    }

    /**
     * Metoda do obsługi calla GET /confirm-email
     *
     * Potwierdzenie maila użytkownika
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function confirmEmail($request, $response, $args) {

        $token= $request->getParam('token');
        $user = \R::findOne( 'user', ' email_token = ? ', [ $token ] );

        if($user === null) {
            return $response->withJson(['error' => 'Token invalid']);
        }

        if($user->email_confirmed == false) {
            $user->email_confirmed = true;
            \R::store($user);
            return $response->withJson([]);
        } else {
            return $response->withJson(['error' => 'Email has been already confirmed.']);
        }
    }

    /**
     * Metoda do obsługi calla GET /reset_password
     *
     * Wysłanie maila z linkiem do zmiany hasła
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function resetPassword($request, $response, $args) {

        $email = $request->getParam('email');
        $user = \R::findOne( 'user', ' email = ? ', [ $email ] );

        if($user === null) {
            return $response->withJson(['error' => 'User not found']);
        }

        $user->reset_password_token = md5(uniqid(rand(), true));

        $headers = "MIME-Version: 1.0" . "\r\n" .
            "Content-type: text/html; charset=UTF-8" . "\r\n";
        mail($user->email, 'eRejestracja - Ustalenie nowego hasła', "Witaj $user->name $user->surname!<br /><br />Kliknij w poniższy link, aby ustalić nowe hasło do konta:<br /><a href='http://iwm.tomys.me/reset-password?token=$user->reset_password_token'>Potwierdzam</a><br /><br />Pozdrawiamy,<br />Zespół eRejestracja", $headers);

        \R::store($user);
        return $response->withJson([]);
    }
}