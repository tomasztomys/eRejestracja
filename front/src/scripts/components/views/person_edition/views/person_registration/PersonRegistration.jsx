import React, { Component } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

export default class PersonRegistration extends Component {
  render() {
    return (
      <RegistrationBox
        personType="admin"
      />
    );
  }
}