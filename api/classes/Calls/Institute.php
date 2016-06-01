<?php

namespace Calls;

/**
 * Grupa calli /institute
 *
 * @package Calls
 */
class Institute
{
    /**
     * @var \Database\Database
     */
    private $_db;

    /**
     * Konstruktor klasy Institute
     */
    public function __construct($db) {
        $this->_db = $db;
    }

    /**
     * Konwersja beana do tablici asocjacyjnej
     *
     * @param $instituteDB bean
     * @return array
     * @throws \Exception
     */
    public function _makeInstitute($instituteDB) {
        if(!isset($instituteDB->id) || !isset($instituteDB->name) || !isset($instituteDB->ltd) || !isset($instituteDB->lng) || !isset($instituteDB->address) || !isset($instituteDB->contact)) {
            throw new \Exception('Some of required values not passed');
        }

        $patient = [];
        $patient['name'] = $instituteDB->name;
        $patient['ltd'] = $instituteDB->ltd;
        $patient['lng'] = $instituteDB->lng;
        $patient['address'] = $instituteDB->address;
        $patient['contact'] = $instituteDB->contact;

        return $patient;
    }

    /**
     * Obsługa calla GET /institute
     *
     * Call służący do pobrania informacji o placówce z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getInstitute($request, $response, $args) {

        $instituteDB = \R::findOne( 'institute', 1 );

        return $response->withJson($this->_makeInstitute($instituteDB));
    }

    /**
     * Obsługa calla PUT /institute
     *
     * Call służący do edytowania informacji o placówce
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function editInstitute($request, $response, $args) {

        $instituteDB = \R::load( 'institute', 1 );

        $instituteDB->name = $request->getParam('name');
        $instituteDB->ltd = $request->getParam('ltd');
        $instituteDB->lng = $request->getParam('lng');
        $instituteDB->address = $request->getParam('address');
        $instituteDB->contact = $request->getParam('contact');

        \R::store($instituteDB);
        return $response->withJson([]);
    }
}