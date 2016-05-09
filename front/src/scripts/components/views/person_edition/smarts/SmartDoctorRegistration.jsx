import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

class SmartDoctorRegistration extends Component {
  onSignUp(values) {
    let parameters = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      specialization: values.specialization
    };

    this.props.dispatch(Action.addDoctor(parameters));
  }

  render() {
    return (
      <PersonRegistration
        personType="doctor"
        title="Doctor registration"
        onSignUp={ this.onSignUp.bind(this) }
      />
    );
  }
}

export default connect()(SmartDoctorRegistration);