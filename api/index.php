<?php
require 'vendor/autoload.php';
require 'rb.php';
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
$appConfig = new \Configs\Config();

$app->add(function (Request $request, Response $response, callable $next) {

    $newResponse = $response->withHeader('Content-type', 'application/json');

    return $next($request, $newResponse);
});


$calls = new \Calls\Calls($app);
$calls->run();

$app->run();
