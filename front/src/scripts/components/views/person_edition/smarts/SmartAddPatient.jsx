import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

class SmartAddPatient extends Component {
  onAddUser(values) {
    let parameters = {
      name: values.name,
      surname: values.surname,
      pesel: values.pesel,
      email: values.email,
      password: values.password,
    };

    this.props.dispatch(Action.addUser(parameters, 'patient'));
    if (this.props.nextStep) {
      this.props.nextStep();
    }
  }

  render() {
    let { buttonAddLabel, registration } = this.props;

    return (
      <PersonRegistration
        personType="patient"
        buttonAddLabel={ buttonAddLabel || 'Add patient' }
        title={ this.props.title || 'Add patient' }
        onAddUser={ this.onAddUser.bind(this) }
        registration={ registration }
      />
    );
  }
}

SmartAddPatient.propTypes = {
  title: PropTypes.string,
  nextStep: PropTypes.func,
  registration: PropTypes.bool,
  buttonAddLabel: PropTypes.string
};

export default connect()(SmartAddPatient);