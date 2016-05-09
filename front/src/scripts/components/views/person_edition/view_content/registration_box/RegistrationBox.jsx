import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem,
  Button,
  Card,
  CardTitle
} from '../../../../ui';

import { ChangePassword } from '../../subcomponents/change_password';
import { PersonData } from '../../subcomponents/person_data';
import { DoctorSpecific } from '../../subcomponents/doctor_specific';
import {
  mergeObjects
} from '../../../../../functions';

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

  onSignUp() {
    let values = {};
    let { changePasswordValues, personDataValues, doctorSpecificValues } = this.state;

    values = mergeObjects(
      values,
      changePasswordValues,
      personDataValues,
      doctorSpecificValues
    );

    this.props.onSignUp(values);
  }

  render() {
    let { changePasswordValues, personDataValues, doctorSpecificValues } = this.state;
    let { personType } = this.props;
    console.log(personType);


    return (
      <Grid
        xsPosition="center"
        center
        className={ style['registration-box'] }
      >
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <Card
            className={ style['signup-card'] }
          >
            <CardTitle
              className={ style['signup-card-title'] }
              title="Registration"
            />
            <div className={ style['signup-card-body'] }>
              <PersonData
                values={ personDataValues }
                onChange={ this._onChangePersonDataInputs.bind(this) }
              />
              <ChangePassword
                values={ changePasswordValues }
                onChange={ this._onChangePasswordInputs.bind(this) }
              />
              { personType === 'doctor' ?
                <DoctorSpecific
                  values={ doctorSpecificValues }
                  onChange={ this._onChangeDoctorSpecificInputes.bind(this) }
                /> : null
              }
            </div>
            <div>
              <Button
                className={ style['signup-button'] }
                label="Sign Up"
                onClick={ this.onSignUp.bind(this) }
              />
            </div>
          </Card>
        </GridItem>
      </Grid>
    );
  }

}

RegistrationBox.propTypes = {
  personType: PropTypes.string,
  onSignUp: PropTypes.func
};
