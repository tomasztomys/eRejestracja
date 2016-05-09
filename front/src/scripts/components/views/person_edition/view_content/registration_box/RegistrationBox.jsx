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

import style from './registration_box.scss';

export default class RegistrationBox extends Component {

  render() {
    let { values, onChange, personType, onSignUp, errors } = this.props;

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
            className={ style['signup-card'] }
          >
            <CardTitle
              className={ style['signup-card-title'] }
              title={ this.props.title }
            />
            <div className={ style['signup-card-body'] }>
              <PersonData
                values={ values }
                onChange={ onChange }
                errors={ errors }
              />
              <ChangePassword
                values={ values }
                onChange={ onChange }
                errors={ errors }
              />
              { personType === 'doctor' ?
                <DoctorSpecific
                  values={ values }
                  onChange={ onChange }
                  errors={ errors }
                /> : null
              }
            </div>
            <div>
              <Button
                className={ style['signup-button'] }
                label="Sign Up"
                onClick={ onSignUp }
              />
            </div>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

const PropTypesStructure = {
  password: PropTypes.string,
  repeatPassword: PropTypes.string,
  oldPassword: PropTypes.string,
  name: PropTypes.string,
  surname: PropTypes.string,
  email: PropTypes.string,
  pesel: PropTypes.string,
  specialization: PropTypes.string
};

RegistrationBox.propTypes = {
  personType: PropTypes.string,
  onChange: PropTypes.func,
  onSignUp: PropTypes.func,
  title: PropTypes.string,
  values: PropTypes.shape(PropTypesStructure),
  errors: PropTypes.shape(PropTypesStructure)
};
