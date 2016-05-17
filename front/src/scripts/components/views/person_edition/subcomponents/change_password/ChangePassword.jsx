import React, { Component, PropTypes } from 'react';

import {
  Input,
} from 'ui';

import style from './change_password.scss';

export default class ChangePassword extends Component {
  constructor() {
    super();

    this.state = {
      labels: {
        password: 'Password',
        repeatPassword: 'Repeat password',
        oldPassword: 'Old password',
        saveButton: 'Change password'
      },
      specificErrors: {
        repeatPassword: ''
      },
      specificErrorsMessages: {
        repeatPassword: 'This password do not match'
      }
    };
  }
  onChangeRepeatPassword(key, value) {
    let { values } = this.props;
    let { specificErrors, specificErrorsMessages } = this.state;

    specificErrors[key] = value !== values.password ? specificErrorsMessages[key] : '';

    this.setState({
      specificErrors
    });

    this.props.onChange(key, value);
  }

  render() {
    let { labels, specificErrors } = this.state;
    let { values, oldPassword, onChange, errors } = this.props;

    return (
      <div className={ style['change-password-box'] }>
        <Input
          key={ labels.password }
          label={ labels.password }
          error={ errors.password }
          value={ values.password }
          type="password"
          onChange={ onChange.bind(this, 'password') }
        />
        <Input
          key={ labels.repeatPassword }
          label={ labels.repeatPassword }
          error={ errors.repeatPassword || specificErrors.repeatPassword }
          value={ values.repeatPassword }
          type="password"
          onChange={ this.onChangeRepeatPassword.bind(this, 'repeatPassword') }
        />
        { oldPassword ?
          <Input
            key={ labels.oldPassword }
            label={ labels.oldPassword }
            error={ errors.oldPassword }
            value={ values.oldPassword }
            type="password"
            onChange={ onChange.bind(this, 'oldPassword') }
          /> : null }
      </div>
    );
  }
}

const PropTypesStructure = {
  password: PropTypes.string,
  repeatPassword: PropTypes.string,
  oldPassword: PropTypes.string,
  saveButton: PropTypes.string,
};

ChangePassword.propTypes = {
  values: PropTypes.shape(PropTypesStructure),
  errors: PropTypes.shape(PropTypesStructure),
  onChange: PropTypes.func,
  oldPassword: PropTypes.bool,
};