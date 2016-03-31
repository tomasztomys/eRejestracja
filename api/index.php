<?php
require 'vendor/autoload.php';
require_once 'AutoLoad.php';

Autoload::run();

function getRequest() {
    echo 'I\'m get request';
}
function postRequest() {
    echo 'I\'m post request';
}
function deleteRequest() {
    echo 'I\'m delete request';
}
function patchRequest() {
    echo 'I\'m patch request';
}

switch($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        getRequest();
        break;
    case 'POST':
        postRequest();
        break;
    case 'DELETE':
        deleteRequest();
        break;
    case 'PATCH':
        patchRequest();
        break;
}

$example=new Calls\Doctor();
$example->run();
