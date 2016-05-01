import React, { Component, PropTypes } from 'react';

import {
  Input,
  Button,
  Card,
  CardTitle
} from '../../../../ui';

import style from './change_password_box.scss';

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
    this.props.onSave();
  }

  _onChangeInput(type, value) {
    let { errors, errorsMessages } = this.state;

    errors[type] = value.length > 0 ? '' : errorsMessages[type];
    this.setState({
      errors
    });

    this.props.onInputChange(type, value);
  }

  render() {
    let { labels, errors } = this.state;
    let { values, oldPassword } = this.props;

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
          value={ values.password }
          onChange={ this._onChangeInput.bind(this, 'password') }
        />
        <Input
          key={ labels.repeatPassword }
          label={ labels.repeatPassword }
          errors={ errors.repeatPassword }
          value={ values.repeatPassword }
          onChange={ this._onChangeInput.bind(this, 'repeatPassword') }
        />
        { oldPassword ?
          <Input
            key={ labels.oldPassword }
            label={ labels.oldPassword }
            errors={ errors.oldPassword }
            value={ values.oldPassword }
            onChange={ this._onChangeInput.bind(this, 'oldPassword') }
          /> : null }
        <Button
          label={ labels.saveButton }
          onClick={ this._onSave.bind(this) }
        />
      </Card>
    );
  }
}

ChangePasswordBox.propTypes = {
  values: PropTypes.object,
  onSave: PropTypes.func,
  onInputChange: PropTypes.func,
  oldPassword: PropTypes.bool
};