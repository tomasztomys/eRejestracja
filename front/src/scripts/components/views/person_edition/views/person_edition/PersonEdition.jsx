import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem,
} from '../../../../ui';

import { ChangePasswordBox } from '../../view_content/change_password_box';
import { PersonDataBox } from '../../view_content/person_data_box';
import { DoctorSpecificBox } from '../../view_content/doctor_specific_box';

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
    console.log(personType);
    return (
      <Grid center>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <PersonDataBox
            values={ personDataValues }
            onChange={ this._onChangePersonDataInputs.bind(this) }
            onSave={ this._onSavePersonData.bind(this) }
          />
        </GridItem>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <ChangePasswordBox
            values={ changePasswordValues }
            onChange={ this._onChangePasswordInputs.bind(this) }
            onSave={ this._onSaveNewPassword.bind(this) }
            oldPassword
          />
        </GridItem>
        { personType === 'doctor' ?
          <GridItem
            xsSize="11"
            mdSize="5"
          >
            <DoctorSpecificBox
              values={ doctorSpecificValues }
              onChange={ this._onChangeDoctorSpecificInputes.bind(this) }
            />
          </GridItem> : null
        }
      </Grid>
    );
  }

}

PersonEdition.propTypes = {
  personType: PropTypes.string
};
