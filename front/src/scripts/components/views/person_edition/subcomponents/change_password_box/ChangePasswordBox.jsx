import React, { Component, PropTypes } from 'react';

import {
  Input,
  Button,
  Card,
  CardTitle
} from '../../../../ui';

import style from './change_password_box';

export default class ChangePasswordBox extends Component {
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

  _onSave() {

  }

  _onChangeInput(type, value) {
    let { errors, errorsMessages } = this.state;

    errors[type] = value.length > 0 ? '' : errorsMessages[type];
    this.setState({
      errors
    });
  }

  render() {
    let { labels, errors } = this.state;

    return (
      <Card className={ style['change-password-box'] }>
        <CardTitle
          title="Change your password"
          subtitle={ `The password Must be 8 to 20 characters in length,
            Must contain at least one letter and one number` }
        />
        <Input
          key={ labels.password }
          label={ labels.password }
          errors={ errors.password }
          onChange={ this._onChangeInput.bind(this, 'password') }
        />
        <Input
          key={ labels.repeatPassword }
          label={ labels.repeatPassword }
          errors={ errors.repeatPassword }
          onChange={ this._onChangeInput.bind(this, 'repeatPassword') }
        />
        <Input
          key={ labels.oldPassword }
          label={ labels.oldPassword }
          errors={ errors.oldPassword }
          onChange={ this._onChangeInput.bind(this, 'oldPassword') }
        />
        <Button
          label={ labels.saveButton }
          onClick={ this._onSave.bind(this) }
        />
      </Card>
    );
  }
}

ChangePasswordBox.propTypes = {
  onSave: PropTypes.func,
  onInputChange: PropTypes.func
};