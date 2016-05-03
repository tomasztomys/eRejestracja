import React, { Component } from 'react';

import { PersonEdition } from '../views/person_edition';

export default class SmartPatientProfileEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="patient"
      />
    );
  }
}