<?php

namespace Database;


class Database
{
    public function connect($config) {
        \R::setup( 'mysql:host='.$config['host'].';dbname='.$config['dbname'],
            $config['user'], $config['password'] );
    }
}