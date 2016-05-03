import React, { Component } from 'react';

import { PersonEdition } from '../';

export default class SmartDoctorProfileEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="doctor"
      />
    );
  }
}