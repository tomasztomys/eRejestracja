import React, { Component, PropTypes } from 'react';

import {
  Card,
} from '../../../../ui';

import { PersonData } from '../../subcomponents/person_data';

import style from './person_data_box.scss';

export default class PersonDataBox extends Component {

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
    let {
      values,
      onChange,
      onSave
    } = this.props;

    return (
      <Card className={ style['person-data'] }
        title="Chane profile data"
        subtitle={ 'Please write real personal data.' }
      >
        <PersonData
          values={ values }
          onChange={ onChange }
          onSave={ onSave }
        />
      </Card>
    );
  }

}

PersonDataBox.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
  onSave: PropTypes.func
};
