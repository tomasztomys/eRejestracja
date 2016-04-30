import React, { Component, PropTypes } from 'react';

import { ChangePasswordBox } from './subcomponents/change_password_box';

export default class PersonEdition extends Component {

  constructor() {
    super();

    this.state = {
      changePasswordValues: {
        password: '',
        repeatPassword: '',
        oldPassword: '',
      }
    };
  }

  _onChangePasswordInputs(type, value) {
    let { changePasswordValues } = this.state;

    changePasswordValues[type] = value;
    this.setState({
      changePasswordValues
    });
  }

  _onSaveNewPassword() {
  }

  render() {
    let { changePasswordValues } = this.state;

    return (
      <div>
        <ChangePasswordBox
          values={ changePasswordValues }
          onInputChange={ this._onChangePasswordInputs.bind(this) }
          onSave={ this._onSaveNewPassword.bind(this) }
        />
      </div>
    );
  }

}

PersonEdition.propTypes = {
};