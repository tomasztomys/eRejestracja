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
    };
  }

  render() {
    let { labels } = this.state;
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
          error={ errors.repeatPassword }
          value={ values.repeatPassword }
          type="password"
          onChange={ onChange.bind(this, 'repeatPassword') }
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

const structure = {
  password: PropTypes.string,
  repeatPassword: PropTypes.string,
  oldPassword: PropTypes.string,
  saveButton: PropTypes.string,
};

ChangePassword.propTypes = {
  values: PropTypes.shape(structure),
  errors: PropTypes.shape(structure),
  onChange: PropTypes.func,
  oldPassword: PropTypes.bool,
};