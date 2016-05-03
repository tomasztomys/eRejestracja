import React, { Component } from 'react';

import { PersonEdition } from '../views/person_edition';

export default class SmartDoctorProfileEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="doctor"
      />
    );
  }
}