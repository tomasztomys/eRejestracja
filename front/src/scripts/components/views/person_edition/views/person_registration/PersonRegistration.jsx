import React, { Component, PropTypes } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

export default class PersonRegistration extends Component {

  render() {
    return (
      <RegistrationBox
        personType="admin"
        onSignUp={ this.props.onSignUp }
      />
    );
  }
}

PersonRegistration.propTypes = {
  onSignUp: PropTypes.func
};