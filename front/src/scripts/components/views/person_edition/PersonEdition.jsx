import React, { Component, PropTypes } from 'react';

import { ChangePasswordBox } from './subcomponents/change_password_box';
import { PersonDataBox } from './subcomponents/person_data_box';


export default class PersonEdition extends Component {

  constructor() {
    super();

    this.state = {
      changePasswordValues: {
        password: '',
        repeatPassword: '',
        oldPassword: '',
      },
      personDataValues: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
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

  _onChangePersonDataInputs(type, value) {
    let { personDataValues } = this.state;

    personDataValues[type] = value;
    this.setState({
      personDataValues
    });
  }

  _onSaveNewPassword() {
  }

  _onSavePersonData() {
  }

  render() {
    let { changePasswordValues, personDataValues } = this.state;

    return (
      <div>
        <ChangePasswordBox
          values={ changePasswordValues }
          onInputChange={ this._onChangePasswordInputs.bind(this) }
          onSave={ this._onSaveNewPassword.bind(this) }
          oldPassword
        />
        <PersonDataBox
          values={ personDataValues }
          onInputChange={ this._onChangePersonDataInputs.bind(this) }
          onSave={ this._onSavePersonData.bind(this) }
        />
      </div>
    );
  }

}

PersonEdition.propTypes = {
};