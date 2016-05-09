import React, { Component, PropTypes } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

export default class PersonRegistration extends Component {

  constructor() {
    super();

    this.state = {
      values: {
        password: '',
        repeatPassword: '',
        oldPassword: '',
        name: '',
        surname: '',
        email: '',
        pesel: '',
        specialization: ''
      }
    };
  }

  onSignUp() {
    this.props.onSignUp(this.state.values);
  }

  onChange(type, value) {
    let { values } = this.state;

    values[type] = value;
    this.setState({
      values
    });
  }

  render() {
    let { values } = this.state;

    return (
      <RegistrationBox
        personType={ this.props.personType }
        onSignUp={ this.props.onSignUp }
        values={ values }
        title={ this.props.title }
      />
    );
  }
}

PersonRegistration.propTypes = {
  onSignUp: PropTypes.func,
  personType: PropTypes.oneOf([ 'patient', 'doctor' ]),
  title: PropTypes.string
};