import React, { Component } from 'react';

import { PersonEdition } from '../views/person_edition';

export default class SmartAdminProfileEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="admin"
      />
    );
  }
}