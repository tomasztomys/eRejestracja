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
      'specialization' => 'surgeon',
      'email_confirmed' => true
    ];
    $doctor2 = [
      'name' => 'Dariusz',
      'surname' => 'Paluch',
      'email' => 'dariusz.paluch@hotmail.com',
      'password' => 'darek123',
      'type' => 'doctor',
      'specialization' => 'pediatrician',
      'email_confirmed' => true
    ];
    $doctor3 = [
      'name' => 'Adam',
      'surname' => 'Nowak',
      'email' => 'doktor@gmail.com',
      'password' => 'doktor',
      'type' => 'doctor',
      'specialization' => 'dentist',
      'email_confirmed' => true
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
      'type' => 'patient',
      'email_confirmed' => true
    ];
    $patient2 = [
      'name' => 'Natalia',
      'surname' => 'Kaczor',
      'email' => 'kaczorek@hotmail.com',
      'password' => 'poznan123',
      'pesel' => '96021532532',
      'type' => 'patient',
      'email_confirmed' => true
    ];
    $patient3 = {
      'name' => 'Adam',
      'surname' => 'Nowak',
      'email' => 'pacjent@gmail.com',
      'password' => 'pacjent',
      'pesel' => '95013505234',
      'type' => 'patient',
      'email_confirmed' => true
    }
    return [$patient1, $patient2, $patient3];
  }

  /**
   * Zwraca mockową tablicę administratorów
   *
   * @return array
   */
  private function _getAdmins() {
    $admin1 = [
        'name' => 'Jacek',
        'surname' => 'Nowak',
        'email' => 'admin@gmail.com',
        'password' => 'admin',
        'type' => 'admin'
        'email_confirmed' => true
    ];
    $admin2 = [
        'name' => 'Julia',
        'surname' => 'Nowicka',
        'email' => 'julia.nowicka@interia.pl',
        'password' => 'julianowicka',
        'type' => 'admin',
        'email_confirmed' => true
    ];

    return [$admin1, $admin2];
  }

  /**
   * Dodaje mockową tablicę lekarzy do bazy danych
   *
   * @return array
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
      $doctorBeans[$i]->email_confirmed = $doctor['email_confirmed'];
      $doctorBeans[$i]->email_token = md5(uniqid(rand(), true));
      $doctorBeans[$i]->ownWorkhoursList = [];
      $doctorBeans[$i]->ownVisitList = [];
      $i++;
    }
    return \R::storeAll($doctorBeans);
  }

  /**
   * Dodaje mockową tablicę pacjentow do bazy danych
   *
   * @return array
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
      $patientBeans[$i]->email_confirmed = $patient['email_confirmed'];
      $patientBeans[$i]->email_token = md5(uniqid(rand(), true));
      $patientBeans[$i]->ownVisitList = [];
      $i++;
    }
    return \R::storeAll($patientBeans);
  }

  /**
   * Dodaje mockową tablicę administratorów do bazy danych
   *
   * @return array
   */
  public function _addAdmins() {
    $admins = $this->_getAdmins();

    $adminBeans = \R::dispense('user', sizeof($admins));

    $i = 0;
    foreach($admins as $admin) {
      $adminBeans[$i]->name = $admin['name'];
      $adminBeans[$i]->surname = $admin['surname'];
      $adminBeans[$i]->email = $admin['email'];
      $adminBeans[$i]->password = $admin['password'];
      $adminBeans[$i]->type = $admin['type'];
      $adminBeans[$i]->email_confirmed = $admin['email_confirmed'];
      $adminBeans[$i]->email_token = md5(uniqid(rand(), true));
      $i++;
    }
    return \R::storeAll($adminBeans);
  }

  /**
   * Dodaje placówkę do bazy danych
   *
   * @return array
   */
  public function _addInstitute() {

    $instituteBean = \R::dispense('institute', 1);

    $instituteBean->name = 'Przychodnia lekarska';
    $instituteBean->ltd = '52.3871569';
    $instituteBean->lng = '16.9716026';
    $instituteBean->address = 'Osiedle Lecha 121/1, 61-299 Poznań';
    $instituteBean->contact = '+48 695 157 493';

    return \R::store($instituteBean);
  }

  /**
   * Metoda służaca do przywrócenia domyślnych danych w bazie danych
   *
   * @return void
   */
  public function run() {
    \R::nuke();

    if (is_array($this->_addDoctors()) && is_array($this->_addPatients()) && is_array($this->_addAdmins()) && $this->_addInstitute() !== 0) {
      echo json_encode([]);
    } else {
      echo json_encode(['reset' => 'error']);
    }
  }
}