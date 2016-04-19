<?php

namespace Database;

/**
 * Klasą do obsługi przywrócenia danych domyślnych w bazie danych
 *
 * @package Database
 */
class Reset
{

  /**
   * Zwraca mockową tablicę lekarzy
   *
   * @return array
   */
  private function _getDoctors() {
    $doctor1 = [
      'name' => 'Tomasz',
      'surname' => 'Tomys',
      'email' => 'tomasz@tomys.pl',
      'password' => 'tomasz',
      'pesel' => '94050112153',
      'type' => 'doctor',
      'specialization' => 'chirurg'
    ];
    $doctor2 = [
      'name' => 'Dariusz',
      'surname' => 'Paluch',
      'email' => 'dariusz.paluch@hotmail.com',
      'password' => 'tomasz',
      'pesel' => '94011532198',
      'type' => 'doctor',
      'specialization' => 'stomatolog'
    ];
    return [$doctor1, $doctor2];
  }

  /**
   * Metoda służaca do przywrócenia domyślnych danych w bazie danych
   *
   * @return void
   */
  public function run() {
    \R::nuke();
    $doctors = $this->_getDoctors();

    $doctorBeans = \R::dispense('doctor', sizeof($doctors));

    $i = 0;
    foreach($doctors as $doctor) {
      $doctorBeans[$i]->name = $doctor['name'];
      $doctorBeans[$i]->surname = $doctor['surname'];
      $doctorBeans[$i]->email = $doctor['email'];
      $doctorBeans[$i]->password = $doctor['password'];
      $doctorBeans[$i]->pesel = $doctor['pesel'];
      $doctorBeans[$i]->type = $doctor['type'];
      $doctorBeans[$i]->specialization = $doctor['specialization'];
      $i++;
    }

    \R::storeAll($doctorBeans);
  }
}