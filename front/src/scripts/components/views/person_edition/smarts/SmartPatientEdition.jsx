import React, { Component } from 'react';

import { PersonEdition } from '../';

export default class SmartPatientEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="patient"
      />
    );
  }
}