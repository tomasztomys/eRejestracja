<?php
require 'vendor/autoload.php';
require_once 'AutoLoad.php';

Autoload::run();

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);


$app->add(function (Request $request, Response $response, callable $next) {

    $newResponse = $response->withHeader('Content-type', 'application/json');

    return $next($request, $newResponse);
});

$app->group('/authorizations', function () {
    $this->post('', '\Calls\Authorizations:authorizations')->setName('authorizations');
});

$app->group('/user', function () {
    $this->get('', '\Calls\User:user')->setName('user');
});

$app->group('/doctors', function () {
    $this->get('', '\Calls\Doctors:getDoctors')->setName('getDoctors');
});

$app->any('/', function () {
    echo "eRejestracja";
});

$app->run();
