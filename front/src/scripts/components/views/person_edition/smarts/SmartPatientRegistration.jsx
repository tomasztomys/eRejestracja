import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

class SmartPatientRegistration extends Component {
  onSignUp(values) {
    let parameters = {
      name: values.name,
      surname: values.surname,
      pesel: values.pesel,
      email: values.email,
      password: values.password,
      specialization: values.specialization
    };

    this.props.dispatch(Action.addUser(parameters, 'patient'));
  }

  render() {
    return (
      <PersonRegistration
        personType="patient"
        title="Patient registration"
        onSignUp={ this.onSignUp.bind(this) }
      />
    );
  }
}

export default connect()(SmartPatientRegistration);