import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem,
  Card,
  CardTitle
} from '../../ui';

import { ChangePasswordBox } from './view_content/change_password_box';
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
      <Grid center>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <PersonDataBox
            values={ personDataValues }
            onInputChange={ this._onChangePersonDataInputs.bind(this) }
            onSave={ this._onSavePersonData.bind(this) }
          />
        </GridItem>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <ChangePasswordBox
            values={ changePasswordValues }
            onInputChange={ this._onChangePasswordInputs.bind(this) }
            onSave={ this._onSaveNewPassword.bind(this) }
            oldPassword
          />
        </GridItem>
      </Grid>
    );
  }

}

PersonEdition.propTypes = {
};
