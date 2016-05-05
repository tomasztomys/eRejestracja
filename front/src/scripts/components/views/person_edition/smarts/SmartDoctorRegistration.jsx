import React, { Component } from 'react';

import { PersonRegistration } from '../views/person_registration';

export default class SmartDoctorRegistration extends Component {
  render() {
    return (
      <PersonRegistration
        personType="doctor"
      />
    );
  }
}