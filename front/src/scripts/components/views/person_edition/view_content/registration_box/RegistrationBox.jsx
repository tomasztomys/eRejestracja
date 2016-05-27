import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import {
  CardWithHeader
} from 'lib/ui';

import {
  Grid,
  GridItem
} from 'lib/grid';

import { ChangePassword } from '../../subcomponents/change_password';
import { PersonData } from '../../subcomponents/person_data';
import { DoctorSpecific } from '../../subcomponents/doctor_specific';

import style from './registration_box.scss';

export default class RegistrationBox extends Component {

  render() {
    let {
      values,
      onChange,
      personType,
      onAddUser,
      buttonAddLabel,
      registration,
      errors
    } = this.props;
    let actions = [
      {
        label: buttonAddLabel,
        onClick: onAddUser,
        className: style['sign-up-button']
      }
    ];
    let registrationBoxStyle = classnames(
      style['registration-box'],
      { [style['registration']]: registration }
    );

    return (
      <Grid
        center
        xsPosition="middle"
        className={ registrationBoxStyle }
      >
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <CardWithHeader
            className={ style['card'] }
            title={ this.props.title }
            actions={ actions }
          >
            <PersonData
              values={ values }
              onChange={ onChange }
              errors={ errors }
              personType={ personType }
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
          </CardWithHeader>
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
  onAddUser: PropTypes.func,
  title: PropTypes.string,
  values: PropTypes.shape(PropTypesStructure),
  errors: PropTypes.shape(PropTypesStructure),
  buttonAddLabel: PropTypes.string,
  registration: PropTypes.bool
};
