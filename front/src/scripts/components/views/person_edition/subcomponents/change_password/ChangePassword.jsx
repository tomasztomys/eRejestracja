import React, { Component, PropTypes } from 'react';

import {
  Input,
} from '../../../../ui';

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
      errors: {
        password: '',
        repeatPassword: '',
        oldPassword: ''
      },
      errorsMessages: {
        password: 'Enter password',
        repeatPassword: 'Enter your password again',
        oldPassword: 'Enter your old password'
      }
    };
  }

  _onChange(type, value) {
    let { errors, errorsMessages } = this.state;

    errors[type] = value.length > 0 ? '' : errorsMessages[type];
    this.setState({
      errors
    });

    this.props.onChange(type, value);
  }

  render() {
    let { labels, errors } = this.state;
    let { values, oldPassword } = this.props;

    return (
      <div className={ style['change-password-box'] }>
        <Input
          key={ labels.password }
          label={ labels.password }
          errors={ errors.password }
          value={ values.password }
          type="password"
          onChange={ this._onChange.bind(this, 'password') }
        />
        <Input
          key={ labels.repeatPassword }
          label={ labels.repeatPassword }
          errors={ errors.repeatPassword }
          value={ values.repeatPassword }
          type="password"
          onChange={ this._onChange.bind(this, 'repeatPassword') }
        />
        { oldPassword ?
          <Input
            key={ labels.oldPassword }
            label={ labels.oldPassword }
            errors={ errors.oldPassword }
            value={ values.oldPassword }
            type="password"
            onChange={ this._onChange.bind(this, 'oldPassword') }
          /> : null }
      </div>
    );
  }
}

ChangePassword.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  oldPassword: PropTypes.bool
};