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
      'type' => 'doctor',
      'specialization' => 'Chirurg'
    ];
    $doctor2 = [
      'name' => 'Dariusz',
      'surname' => 'Paluch',
      'email' => 'dariusz.paluch@hotmail.com',
      'password' => 'tomasz',
      'type' => 'doctor',
      'specialization' => 'Pediatra'
    ];
    $doctor3 = [
      'name' => 'Adam',
      'surname' => 'Nowak',
      'email' => 'adam.nowak@hotmail.com',
      'password' => 'nowaczek123',
      'type' => 'doctor',
      'specialization' => 'Dentysta'
    ];

    return [$doctor1, $doctor2, $doctor3];
  }

  /**
   * Zwraca mockową tablicę pacjentow
   *
   * @return array
   */
  private function _getPatients() {
    $patient1 = [
      'name' => 'Kamil',
      'surname' => 'Kaźmierczak',
      'email' => 'kamil@kazmierczak.pl',
      'password' => 'kamil123',
      'pesel' => '92060112652',
      'type' => 'patient'
    ];
    $patient2 = [
      'name' => 'Natalia',
      'surname' => 'Kaczor',
      'email' => 'kaczorek@hotmail.com',
      'password' => 'poznan123',
      'pesel' => '96021532532',
      'type' => 'patient'
    ];
    return [$patient1, $patient2];
  }

  /**
   * Dodaje mockową tablicę lekarzy do bazy danych
   *
   * @return void
   */
  public function _addDoctors() {
    $doctors = $this->_getDoctors();

    $doctorBeans = \R::dispense('user', sizeof($doctors));

    $i = 0;
    foreach($doctors as $doctor) {
      $doctorBeans[$i]->name = $doctor['name'];
      $doctorBeans[$i]->surname = $doctor['surname'];
      $doctorBeans[$i]->email = $doctor['email'];
      $doctorBeans[$i]->password = $doctor['password'];
      $doctorBeans[$i]->type = $doctor['type'];
      $doctorBeans[$i]->specialization = $doctor['specialization'];
      $i++;
    }
    \R::storeAll($doctorBeans);
  }

  /**
   * Dodaje mockową tablicę pacjentow do bazy danych
   *
   * @return void
   */
  public function _addPatients() {
    $patients = $this->_getPatients();

    $patientBeans = \R::dispense('user', sizeof($patients));

    $i = 0;
    foreach($patients as $patient) {
      $patientBeans[$i]->name = $patient['name'];
      $patientBeans[$i]->surname = $patient['surname'];
      $patientBeans[$i]->email = $patient['email'];
      $patientBeans[$i]->password = $patient['password'];
      $patientBeans[$i]->pesel = $patient['pesel'];
      $patientBeans[$i]->type = $patient['type'];
      $i++;
    }
    \R::storeAll($patientBeans);
  }

  /**
   * Metoda służaca do przywrócenia domyślnych danych w bazie danych
   *
   * @return void
   */
  public function run() {
    \R::nuke();

    $this->_addDoctors();
    $this->_addPatients();

  }
}