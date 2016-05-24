import React, { Component } from 'react';

import PatientBookVisit from '../PatientBookVisit';

export default class SmartPatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        date: undefined,
        time: '',
        doctor: 0,
        selectedDate: undefined,
        description: ''
      },
    };
  }

  _onValuesChange(key, value) {
    let { values } = this.state;

    values[key] = value;
    this.setState(
      values
    );
  }

  _onSignUp() {
  }

  render() {
    let { values } = this.state;

    return (
      <PatientBookVisit
        values={ values }
        onChange={ this._onValuesChange.bind(this) }
        signUp={ this._onSignUp }
      />
    );
  }
}