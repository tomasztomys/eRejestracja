import React, { Component } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

export default class PersonRegistration extends Component {
  _onSignUp() {

  }

  render() {
    return (
      <RegistrationBox
        personType="admin"
        onSignUp={ this._onSignUp.bind(this) }
      />
    );
  }
}