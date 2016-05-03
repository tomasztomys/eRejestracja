import React, { Component } from 'react';

import { PersonEdition } from '../';

export default class SmartDoctorEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="doctor"
      />
    );
  }
}