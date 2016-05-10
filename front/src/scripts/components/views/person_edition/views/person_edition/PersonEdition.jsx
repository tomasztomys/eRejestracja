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
      values: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
        password: '',
        repeatPassword: '',
        oldPassword: '',
        specialization: ''
      },
      errors: {
        name: '',
        surname: '',
        email: '',
        pesel: '',
        password: '',
        repeatPassword: '',
        oldPassword: '',
        specialization: ''
      },
      errorsMessages: {
        name: 'Enter name.',
        surname: 'Enter surname.',
        email: 'Enter email.',
        pesel: 'Enter pesel.',
        password: 'Enter password',
        repeatPassword: 'Enter password again',
        oldPassword: 'Enter your old password',
        specialization: 'Enter specialization'
      }
    };
  }
  onChange(type, value) {
    let { values } = this.state;

    values[type] = value;
    this.setState({
      values
    });
  }

  onSaveNewPassword() {
  }

  onSavePersonData() {
  }

  onSaveDoctorSpecific() {
  }

  render() {
    let { values, errors } = this.state;
    let { personType } = this.props;

    return (
      <Grid center>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <PersonDataBox
            values={ values }
            errors={ errors }
            onChange={ this.onChange.bind(this) }
            onSave={ this.onSavePersonData.bind(this) }
            personType={ personType }
          />
        </GridItem>
        <GridItem
          xsSize="11"
          mdSize="5"
        >
          <ChangePasswordBox
            values={ values }
            errors={ errors }
            onChange={ this.onChange.bind(this) }
            onSave={ this.onSaveNewPassword.bind(this) }
            oldPassword
          />
        </GridItem>
        { personType === 'doctor' ?
          <GridItem
            xsSize="11"
            mdSize="5"
          >
            <DoctorSpecificBox
              values={ values }
              errors={ errors }
              onChange={ this.onChange.bind(this) }
              onSave={ this.onSaveDoctorSpecific.bind(this) }
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
