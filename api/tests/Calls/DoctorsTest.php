<?php
class DoctorsTest extends PHPUnit_Framework_TestCase
{

    public function testMakeDoctor()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $obj = (object) [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'type' => 'doctor',
            'specialization' => 'surgeon'
        ];

        $array = $doctors->_makeDoctor($obj);

        // Assert
        $this->assertEquals((array)$obj, $array);
    }

    public function testMakeDoctor2()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $obj = (object) [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'password' => '123456',
            'type' => 'doctor',
            'specialization' => 'surgeon'
        ];

        $expObj = [
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'type' => 'doctor',
            'specialization' => 'surgeon'
        ];

        $array = $doctors->_makeDoctor($obj);

        // Assert
        $this->assertEquals($expObj, $array);
    }


    /**
     * @expectedException \Exception
     * @expectedExceptionMessage Some of required values not passed
     */
    public function testMakeDoctor3()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $obj = (object) [];

        $doctors->_makeDoctor($obj);
    }


    public function testIfDoctorFound()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $result = $doctors->_ifFoundDoctor(1, 'doctor');

        // Assert
        $this->assertTrue($result);
    }

    public function testIfDoctorFound2()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $result = $doctors->_ifFoundDoctor(0, 'doctor');

        // Assert
        $this->assertFalse($result);
    }

    public function testIfDoctorFound3()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $result = $doctors->_ifFoundDoctor(0, 'patient');

        // Assert
        $this->assertFalse($result);
    }

    public function testIfDoctorFound4()
    {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        // Arrange
        $doctors = new \Calls\Doctors($mock);

        $result = $doctors->_ifFoundDoctor(1, 'patient');

        // Assert
        $this->assertFalse($result);
    }

    public function testGetAllDoctors() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [ (object)[
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'password' => '123456',
            'type' => 'doctor',
            'specialization' => 'surgeon'
        ]];

        $mock->expects($this->once())
            ->method('findAllDoctors')
            ->will(
                $this->returnValue($array)
            );

        $doctors = new \Calls\Doctors($mock);

        $array = $doctors->_getAllDoctors();
        $arrayExp = [[
            'id' => 1,
            'name' => 'Tomasz',
            'surname' => 'Tomys',
            'email' => 'tomasz@tomys.pl',
            'type' => 'doctor',
            'specialization' => 'surgeon'
        ]];

        $this->assertEquals($arrayExp, $array);
    }

    public function testGetAllDoctors2() {
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
                'specialization' => 'surgeon'
            ],
            (object)[
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'password' => '12345622',
                'type' => 'doctor',
                'specialization' => 'xxx'
            ]
        ];

        $mock->expects($this->once())
            ->method('findAllDoctors')
            ->will(
                $this->returnValue($array)
            );

        $doctors = new \Calls\Doctors($mock);

        $array = $doctors->_getAllDoctors();
        $arrayExp = [
            [
                'id' => 1,
                'name' => 'Tomasz',
                'surname' => 'Tomys',
                'email' => 'tomasz@tomys.pl',
                'type' => 'doctor',
                'specialization' => 'surgeon'
            ],
            [
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'type' => 'doctor',
                'specialization' => 'xxx'
            ]
        ];

        $this->assertEquals($arrayExp, $array);
    }

    public function testGetAllDoctors3() {
        $mock = $this->getMockBuilder('\Database\Database')
            ->getMock();

        $array = [];

        $mock->expects($this->once())
            ->method('findAllDoctors')
            ->will(
                $this->returnValue($array)
            );

        $doctors = new \Calls\Doctors($mock);

        $array = $doctors->_getAllDoctors();
        $arrayExp = [];

        $this->assertEquals($arrayExp, $array);
    }

    /**
     * @expectedException \Exception
     * @expectedExceptionMessage It's not a doctor
     */
    public function testGetAllDoctors4() {
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
                'specialization' => 'surgeon'
            ],
            (object)[
                'id' => 2,
                'name' => 'Dariusz',
                'surname' => 'Paluch',
                'email' => 'dariusz@paluch.pl',
                'password' => '12345622',
                'type' => 'patient',
                'pesel' => '11123232323'
            ]
        ];

        $mock->expects($this->once())
            ->method('findAllDoctors')
            ->will(
                $this->returnValue($array)
            );

        $doctors = new \Calls\Doctors($mock);

        $doctors->_getAllDoctors();
    }
}
