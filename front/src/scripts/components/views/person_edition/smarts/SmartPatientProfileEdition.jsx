import React, { Component } from 'react';

import { PersonEdition } from '../';

export default class SmartPatientProfileEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="patient"
      />
    );
  }
}