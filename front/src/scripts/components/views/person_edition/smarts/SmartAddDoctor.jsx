import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

class SmartAddDoctor extends Component {
  onAddUser(values) {
    let parameters = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
      specialization: values.specialization
    };

    this.props.dispatch(Action.addUser(parameters, 'doctor'));
    if (this.props.nextStep) {
      this.props.nextStep();
    }
  }

  render() {
    let { buttonAddLabel, registration } = this.props;

    return (
      <PersonRegistration
        personType="doctor"
        buttonAddLabel={ buttonAddLabel || 'Add doctor' }
        title={ this.props.title || 'Add doctor' }
        onAddUser={ this.onAddUser.bind(this) }
        registration={ registration }
      />
    );
  }
}

SmartAddDoctor.propTypes = {
  title: PropTypes.string,
  nextStep: PropTypes.func,
  buttonAddLabel: PropTypes.string,
  registration: PropTypes.bool
};

export default connect()(SmartAddDoctor);