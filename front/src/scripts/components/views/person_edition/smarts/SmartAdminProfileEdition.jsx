import React, { Component } from 'react';

import { PersonEdition } from '../';

export default class SmartAdminProfileEdition extends Component {
  render() {
    return (
      <PersonEdition
        personType="admin"
      />
    );
  }
}