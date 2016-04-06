<?php
/**
 * Created by PhpStorm.
 * User: Tomasz Tomys
 * Date: 06.04.2016
 * Time: 01:57
 */

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
            'pesel' => '94050112153'
        ];
        return $response->withJson($userData);
    }
}