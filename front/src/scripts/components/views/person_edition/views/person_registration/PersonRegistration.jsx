import React, { Component, PropTypes } from 'react';

import { RegistrationBox } from '../../view_content/registration_box';

import { checkData } from '../../../../../utilities';

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

  componentWillMount() {
    let { values } = this.state;

    if (this.props.personType === 'doctor') {
      //  doctor
      delete values.pesel;
    }
    else {
      //  patient
      delete values.specialization;
    }

    this.setState({
      values
    });
  }

  onAddUser() {
    let { values, errors, errorsMessages } = this.state;
    let { status, errorsResponse } = checkData(values, errors, errorsMessages);

    if (status && values.password === values.repeatPassword) {
      this.props.onAddUser(values);
    }
    else {
      this.setState({
        errors: errorsResponse
      });
    }
  }

  onChange(type, value) {
    let { values } = this.state;

    values[type] = value;
    this.setState({
      values
    });
  }

  render() {
    let { values, errors } = this.state;
    let { personType, title, buttonAddLabel, registration } = this.props;

    return (
      <RegistrationBox
        personType={ personType }
        onAddUser={ this.onAddUser.bind(this) }
        buttonAddLabel={ buttonAddLabel }
        values={ values }
        errors={ errors }
        onChange={ this.onChange.bind(this) }
        title={ title }
        registration={ registration }
      />
    );
  }
}

PersonRegistration.propTypes = {
  onAddUser: PropTypes.func,
  buttonAddLabel: PropTypes.string,
  personType: PropTypes.oneOf([ 'patient', 'doctor', 'admin' ]),
  title: PropTypes.string,
  registration: PropTypes.bool
};