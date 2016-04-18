<?php
/**
 * Created by PhpStorm.
 * User: tomasztomys
 * Date: 18.04.2016
 * Time: 00:44
 */

namespace Database;


class Reset
{

  private function _getDoctors() : array {
    $doctor1 = [
      'name' => 'Tomasz',
      'surname' => 'Tomys',
      'email' => 'tomasz@tomys.pl',
      'pesel' => '94050112153',
      'type' => 'doctor',
      'specialization' => 'chirurg'
    ];
    $doctor2 = [
      'name' => 'Dariusz',
      'surname' => 'Paluch',
      'email' => 'dariusz.paluch@hotmail.com',
      'pesel' => '94011532198',
      'type' => 'doctor',
      'specialization' => 'stomatolog'
    ];
    return [$doctor1, $doctor2];
  }

  public function run() {
    \R::nuke();
    $doctors = $this->_getDoctors();

    $doctorBeans = \R::dispense('doctor', sizeof($doctors));

    $i = 0;
    foreach($doctors as $doctor) {
      $doctorBeans[$i]->name = $doctor['name'];
      $doctorBeans[$i]->surname = $doctor['surname'];
      $doctorBeans[$i]->email = $doctor['email'];
      $doctorBeans[$i]->pesel = $doctor['pesel'];
      $doctorBeans[$i]->type = $doctor['type'];
      $doctorBeans[$i]->specialization = $doctor['specialization'];
      $i++;
    }

    \R::storeAll($doctorBeans);
  }
}