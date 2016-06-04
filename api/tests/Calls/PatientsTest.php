<?php
class PatientsTest extends PHPUnit_Framework_TestCase
{

    public function testMakePatient()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $obj = (object) [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'type' => 'patient',
            'pesel' => '12345678900',
            'email_confirmed' => true
        ];

        $array = $patients->_makePatient($obj);

        // Assert
        $this->assertEquals((array)$obj, $array);
    }

    public function testMakePatient2()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $obj = (object) [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'password' => '123456',
            'type' => 'patient',
            'pesel' => '12345678900',
            'email_confirmed' => true
        ];

        $expObj = [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'type' => 'patient',
            'pesel' => '12345678900',
            'email_confirmed' => true
        ];

        $array = $patients->_makePatient($obj);

        // Assert
        $this->assertEquals($expObj, $array);
    }


    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Some of required values not passed
     */
    public function testMakePatient3()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $obj = (object) [];

        $patients->_makePatient($obj);
    }


    public function testIfPatientFound()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $result = $patients->_ifFoundPatient(1, 'patient');

        // Assert
        $this->assertTrue($result);
    }

    public function testIfPatientFound2()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $result = $patients->_ifFoundPatient(0, 'doctor');

        // Assert
        $this->assertFalse($result);
    }

    public function testIfPatientFound3()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $result = $patients->_ifFoundPatient(0, 'patient');

        // Assert
        $this->assertFalse($result);
    }

    public function testIfPatientFound4()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $patients = new \Calls\Patients($mock);

        $result = $patients->_ifFoundPatient(1, 'doctor');

        // Assert
        $this->assertFalse($result);
    }

    public function testGetAllPatients() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [ (object)[
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'password' => '123456',
            'type' => 'patient',
            'pesel' => '12345678900',
            'email_confirmed' => true
        ]];

        $mock->expects($this->once())
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array)
            );

        $patients = new \Calls\Patients($mock);

        $array = $patients->_getAllPatients();
        $arrayExp = [[
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'type' => 'patient',
            'pesel' => '12345678900',
            'email_confirmed' => true
        ]];

        $this->assertEquals($arrayExp, $array);
    }

    public function testGetAllPatients2() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [
            (object)[
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'password' => '123456',
                'type' => 'patient',
                'pesel' => '12345678900',
                'email_confirmed' => true
            ],
            (object)[
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'password' => '12345622',
                'type' => 'patient',
                'pesel' => '12345678911',
                'email_confirmed' => true
            ]
        ];

        $mock->expects($this->once())
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array)
            );

        $patients = new \Calls\Patients($mock);

        $array = $patients->_getAllPatients();
        $arrayExp = [
            [
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'type' => 'patient',
                'pesel' => '12345678900',
                'email_confirmed' => true
            ],
            [
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'type' => 'patient',
                'pesel' => '12345678911',
                'email_confirmed' => true
            ]
        ];

        $this->assertEquals($arrayExp, $array);
    }

    public function testGetAllPatients3() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [];

        $mock->expects($this->once())
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array)
            );

        $patients = new \Calls\Patients($mock);

        $array = $patients->_getAllPatients();
        $arrayExp = [];

        $this->assertEquals($arrayExp, $array);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage It's not a patient
     */
    public function testGetAllPatients4() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [
            (object)[
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'password' => '123456',
                'type' => 'doctor',
                'specialization' => 'surgeon',
                'email_confirmed' => true
            ],
            (object)[
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'password' => '12345622',
                'type' => 'patient',
                'pesel' => '11123232323',
                'email_confirmed' => true
            ]
        ];

        $mock->expects($this->once())
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array)
            );

        $patients = new \Calls\Patients($mock);

        $patients->_getAllPatients();
    }

    public function testDeletePatient() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [
            (object)[
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'password' => '123456',
                'type' => 'patient',
                'pesel' => '12345555555',
                'email_confirmed' => true
            ],
            (object)[
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'password' => '12345622',
                'type' => 'patient',
                'pesel' => '11123232323',
                'email_confirmed' => true
            ]
        ];

        $array2 = [
            (object)[
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'password' => '12345622',
                'type' => 'patient',
                'pesel' => '11123232323',
                'email_confirmed' => true
            ]
        ];

        $expArray = [
            [
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'type' => 'patient',
                'pesel' => '12345555555',
                'email_confirmed' => true
            ],
            [
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'type' => 'patient',
                'pesel' => '11123232323',
                'email_confirmed' => true
            ]
        ];

        $expArray2 = [
            [
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'type' => 'patient',
                'pesel' => '11123232323',
                'email_confirmed' => true
            ]
        ];

        $mock->expects($this->at(0))
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array)
            );

        $mock->expects($this->once())
            ->method('loadUserById')
            ->withAnyParameters()
            ->will(
                $this->returnValue($array[0])
            );

        $mock->expects($this->once())
            ->method('trash');

        $patients = new \Calls\Patients($mock);
        $this->assertEquals($expArray, $patients->_getAllPatients());


        $patients->trashPatient(1);

        $mock->expects($this->at(0))
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array2)
            );

        $this->assertEquals($expArray2, $patients->_getAllPatients());
    }

    public function testDeletePatient2() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [
            (object)[
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'password' => '123456',
                'type' => 'patient',
                'pesel' => '12345555555',
                'email_confirmed' => true
            ]
        ];

        $array2 = [];

        $expArray = [
            [
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'type' => 'patient',
                'pesel' => '12345555555',
                'email_confirmed' => true
            ]
        ];

        $expArray2 = [];

        $mock->expects($this->at(0))
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array)
            );

        $mock->expects($this->once())
            ->method('loadUserById')
            ->withAnyParameters()
            ->will(
                $this->returnValue($array[0])
            );

        $mock->expects($this->once())
            ->method('trash');

        $patients = new \Calls\Patients($mock);
        $this->assertEquals($expArray, $patients->_getAllPatients());


        $patients->trashPatient(1);

        $mock->expects($this->at(0))
            ->method('findAllPatients')
            ->will(
                $this->returnValue($array2)
            );

        $this->assertEquals($expArray2, $patients->_getAllPatients());
    }
}
