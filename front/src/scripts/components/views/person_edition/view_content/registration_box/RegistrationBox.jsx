import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem,
  Card,
} from '../../../../ui';

import { ChangePassword } from '../../subcomponents/change_password';
import { PersonData } from '../../subcomponents/person_data';
import { DoctorSpecific } from '../../subcomponents/doctor_specific';

import style from './registration_box.scss';

export default class RegistrationBox extends Component {

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
      },
      doctorSpecificValues: {
        specialization: ''
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

  _onChangeDoctorSpecificInputes(type, value) {
    let { doctorSpecificValues } = this.state;

    doctorSpecificValues[type] = value;
    this.setState({
      doctorSpecificValues
    });
  }

  _onSaveNewPassword() {
  }

  _onSavePersonData() {
  }

  render() {
    let { changePasswordValues, personDataValues, doctorSpecificValues } = this.state;
    let { personType } = this.props;

    return (
      <Grid
        center
        className={ style['registration-box'] }
      >
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <Card
            title="Registration"
          >
            <PersonData
              values={ personDataValues }
              onChange={ this._onChangePersonDataInputs.bind(this) }
              onSave={ this._onSavePersonData.bind(this) }
            />
            <ChangePassword
              values={ changePasswordValues }
              onChange={ this._onChangePasswordInputs.bind(this) }
              onSave={ this._onSaveNewPassword.bind(this) }
              oldPassword
            />
            { personType === 'doctor' ?
              <DoctorSpecific
                values={ doctorSpecificValues }
                onChange={ this._onChangeDoctorSpecificInputes.bind(this) }
              /> : null
            }
          </Card>
        </GridItem>
      </Grid>
    );
  }

}

RegistrationBox.propTypes = {
  personType: PropTypes.string
};
