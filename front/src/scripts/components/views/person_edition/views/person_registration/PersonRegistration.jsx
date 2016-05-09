import React, { Component, PropTypes } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

export default class PersonRegistration extends Component {

  constructor() {
    super();

    this.state = {
      values: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
        password: '',
        repeatPassword: '',
        specialization: ''
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
        password: '',
        repeatPassword: '',
        specialization: ''
      },
      errorsMessages: {
        name: 'Enter name.',
        surname: 'Enter surname.',
        email: 'Enter email.',
        pesel: 'Enter pesel.',
        password: 'Enter password',
        repeatPassword: 'Enter your password again',
        specialization: 'Enter your specialization'
      }
    };
  }

  onSignUp() {
    this.props.onSignUp(this.state.values);
  }

  onChange(type, value) {
    let { values, errors, errorsMessages } = this.state;

    errors[type] = value.length > 0 ? '' : errorsMessages[type];
    values[type] = value;
    this.setState({
      values,
      errors
    });
  }

  render() {
    let { values, errors } = this.state;
    let { personType, onSignUp, title } = this.props;

    return (
      <RegistrationBox
        personType={ personType }
        onSignUp={ onSignUp }
        values={ values }
        errors={ errors }
        onChange={ this.onChange.bind(this) }
        title={ title }
      />
    );
  }
}

PersonRegistration.propTypes = {
  onSignUp: PropTypes.func,
  personType: PropTypes.oneOf([ 'patient', 'doctor' ]),
  title: PropTypes.string
};