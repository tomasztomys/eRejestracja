import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

class SmartAddPatient extends Component {
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
    if (this.props.nextStep) {
      this.props.nextStep();
    }
  }

  render() {
    return (
      <PersonRegistration
        personType="patient"
        title={ this.props.title || 'Add patient' }
        onSignUp={ this.onSignUp.bind(this) }
      />
    );
  }
}

SmartAddPatient.propTypes = {
  title: PropTypes.string,
  nextStep: PropTypes.func
};

export default connect()(SmartAddPatient);