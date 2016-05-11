import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { PersonRegistration } from '../views/person_registration';
import * as Action from '../../../../actions/Actions';

class SmartAddDoctor extends Component {
  onSignUp(values) {
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
    return (
      <PersonRegistration
        personType="doctor"
        title={ this.props.title || 'Add doctor' }
        onSignUp={ this.onSignUp.bind(this) }
      />
    );
  }
}

SmartAddDoctor.propTypes = {
  title: PropTypes.string,
  nextStep: PropTypes.func
};

export default connect()(SmartAddDoctor);