<?php
class DoctorsTest extends PHPUnit_Framework_TestCase
{

    public function testMakeDoctor()
    {
        // Arrange
        $doctors = new \Calls\Doctors();

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

}
