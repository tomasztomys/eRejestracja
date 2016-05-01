import React, { Component, PropTypes } from 'react';

import {
  Card,
  CardTitle
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
      onInputChange,
      onSave
    } = this.props;

    return (
      <Card className={ style['person-data'] }>
        <CardTitle
          title="Chane profile data"
          subtitle={ 'Please write real personal data.' }
        />
        <PersonData
          values={ values }
          onInputChange={ onInputChange }
          onSave={ onSave }
        />
      </Card>
    );
  }

}

PersonDataBox.propTypes = {
  values: PropTypes.object,
  onInputChange: PropTypes.func,
  onSave: PropTypes.func
};
