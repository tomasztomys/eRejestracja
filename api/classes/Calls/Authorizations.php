<?php

namespace Calls;

class Authorizations
{
    protected $ci;

    public function __construct(\Slim\Container $ci) {
        $this->ci = $ci;
    }

    public function authorizations($request, $response, $args) {
        if($request->getParam('email') === 'tomasz@tomys.pl' && $request->getParam('password') === 'tomasz') {
            return $response->withJson(['login' => true]);
        } else {
            $newResponse = $response->withStatus(422);
            return $newResponse->withJson(['login' => false]);
        }
    }
}