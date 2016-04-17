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

    $response = $response->withHeader('Access-Control-Allow-Origin', '*');
    $response = $response->withHeader('Access-Control-Allow-Credentials', 'true');
    $response = $response->withHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type, Content-Range, Content-Disposition, Content-Description');
    $response = $response->withHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    $response = $response->withHeader('Content-Type', 'application/json');

    return $next($request, $response);
});


$calls = new \Calls\Calls($app);
$calls->run();

$app->run();
