import React, { Component } from 'react';

import { PersonRegistration } from '../views/person_registration';

export default class SmartDoctorRegistration extends Component {
  onSignUp(values) {

  }

  render() {
    return (
      <PersonRegistration
        personType="doctor"
        onSignUp={ this.onSignUp }
      />
    );
  }
}