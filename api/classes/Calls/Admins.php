<?php

namespace Calls;

/**
 * Grupa calli /admins
 *
 * @package Calls
 */
class Admins
{
    /**
     * @var \Database\Database
     */
    private $_db;

    /**
     * Konstruktor klasy Admins
     */
    public function __construct($db) {
        $this->_db = $db;
    }

    /**
     * Konwersja beana do tablici asocjacyjnej
     *
     * @param $adminDB bean
     * @return array
     * @throws \Exception
     */
    public function _makeAdmin($adminDB) {
        if(!isset($adminDB->id) || !isset($adminDB->name) || !isset($adminDB->surname) || !isset($adminDB->email) || !isset($adminDB->type) || !isset($adminDB->email_confirmed)) {
            if(isset($adminDB->type) && $adminDB->type !== 'admin') {
                throw new \Exception("It's not a admin");
            }
            throw new \Exception('Some of required values not passed');
        }

        $admin = [];
        $admin['id'] = (int)$adminDB->id;
        $admin['name'] = $adminDB->name;
        $admin['surname'] = $adminDB->surname;
        $admin['email'] = $adminDB->email;
        $admin['type'] = $adminDB->type;
        $admin['email_confirmed'] = (bool)$adminDB->email_confirmed;

        return $admin;
    }

    /**
     * Pobranie wszystkich administratorow z bazy i przedstawienie w formie tabeli
     *
     * @return array
     */
    public function _getAllAdmins() {
        $adminsDB = $this->_db->findAllAdmins();
        $admins = [];
        foreach($adminsDB as $adminDB) {
            $admin = $this->_makeAdmin($adminDB);
            array_push($admins, $admin);
        }

        return $admins;
    }

    /**
     * Obsługa calla GET /admins
     *
     * Call służący do pobrania wszystkich administratorow z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getAdmins($request, $response, $args) {

        $admins = $this->_getAllAdmins();

        return $response->withJson($admins);
    }

    /**
     * Sprawdza czy podane id i typ to administrator
     *
     * Funkcja mająca na celu czy jednostka o podanym id i typie to administrator
     *
     * @param $id int Id administratora
     * @param $type string Typ administratora
     *
     * @return Bool
     */
    public function _ifFoundAdmin($id, $type) {
        if($id === 0 || $type !== 'admin') {
            return false;
        }

        return true;
    }

    /**
     * Obsługa calla GET /admins/{id}
     *
     * Call służący do pobrania administratora z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function getAdmin($request, $response, $args) {

        $id = $args['id'];

        $adminDB = $this->_db->loadUserById($id);

        if(!$this->_ifFoundAdmin($adminDB->id, $adminDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Admin not found']);
        }

        return $response->withJson($this->_makeAdmin($adminDB));
    }

    /**
     * Obsługa calla POST /admins
     *
     * Call służący do dodawania administratora
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function addAdmin($request, $response, $args) {

        $users = \R::findAll( 'user', ' pesel = ? ', [ $request->getParam('pesel') ]);
        if(sizeof($users) > 0) {
            $response = $response->withStatus(422);
            return $response->withJson(['pesel' => 'has been already in db']);
        }

        $users = \R::findAll( 'user', ' email = ? ', [ $request->getParam('email') ]);
        if(sizeof($users) > 0) {
            $response = $response->withStatus(422);
            return $response->withJson(['email' => 'has been already in db']);
        }

        $adminBean = \R::dispense('user');

        $adminBean->name = $request->getParam('name');
        $adminBean->surname = $request->getParam('surname');
        $adminBean->email = $request->getParam('email');
        $adminBean->password = $request->getParam('password');
        $adminBean->type = 'admin';
        $adminBean->email_confirmed = false;
        $adminBean->email_token = md5(uniqid(rand(), true));

        $headers = "MIME-Version: 1.0" . "\r\n" .
            "Content-type: text/html; charset=UTF-8" . "\r\n";
        mail($adminBean->email, 'eRejestracja - Potwierdzenie maila', "Witaj $adminBean->name $adminBean->surname!<br /><br />Dziękujęmy za rejestrację w systemie eRejestracja. Prosimy o potwierdzenie maila, klikając w poniższy link:<br /><a href='http://iwm.tomys.me/confirm-email?token=$adminBean->email_token'>Potwierdzam</a><br /><br />Pozdrawiamy,<br />Zespół eRejestracja", $headers);

        \R::store($adminBean);
        return $response->withJson([]);
    }

    /**
     * Metoda wywołująca metodę z Database, która ma usunąć administratora z bazy danych
     *
     * @param $id int id administratora
     *
     * @return bool
     */
    public function trashAdmin($id) {
        $adminDB = $this->_db->loadUserById($id);

        if($this->_ifFoundAdmin($adminDB->id, $adminDB->type)) {
            $this->_db->trash($adminDB);
            return true;
        }

        return false;
    }

    /**
     * Obsługa calla DELETE /admins/{id}
     *
     * Call służący do usuwania administratora z bazy danych
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function deleteAdmin($request, $response, $args) {

        $id = $args['id'];

        if($this->trashAdmin($id)) {
            return $response->withJson([]);
        }

        $response = $response->withStatus(422);
        return $response->withJson(['error' => 'Admin not found']);
    }

    /**
     * Obsługa calla PUT /admins/{id}
     *
     * Call służący do edytowania administratora
     *
     * @param $request \Psr\Http\Message\ServerRequestInterface
     * @param $response \Psr\Http\Message\ResponseInterface
     * @param $args array
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function editAdmin($request, $response, $args) {

        $id = $args['id'];
        $adminDB = \R::load( 'user', $id );

        if(!$this->_ifFoundAdmin($adminDB->id, $adminDB->type)) {
            $response = $response->withStatus(422);
            return $response->withJson(['error' => 'Admin not found']);
        }

        $users = \R::findAll( 'user', ' pesel = ? ', [ $request->getParam('pesel') ]);
        if(sizeof($users) > 0) {
            $response = $response->withStatus(422);
            return $response->withJson(['pesel' => 'has been already in db']);
        }

        $users = \R::findAll( 'user', ' email = ? ', [ $request->getParam('email') ]);
        if(sizeof($users) > 0) {
            $response = $response->withStatus(422);
            return $response->withJson(['email' => 'has been already in db']);
        }

        $adminDB->name = $request->getParam('name');
        $adminDB->surname = $request->getParam('surname');
        $adminDB->email = $request->getParam('email');
        $adminDB->type = 'admin';

        \R::store($adminDB);
        return $response->withJson([]);
    }
}