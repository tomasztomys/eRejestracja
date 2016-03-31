<?php
require 'vendor/autoload.php';
require_once 'AutoLoad.php';

Autoload::run(); 

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;
$app->get('/', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write('It\'s a '.$request->getMethod().' request!');

    return $response;
});

$app->post('/', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write('It\'s a '.$request->getMethod().' request!');

    return $response;
});

$app->delete('/', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write('It\'s a '.$request->getMethod().' request!');

    return $response;
});

$app->put('/', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write('It\'s a '.$request->getMethod().' request!');

    return $response;
});
$app->run();