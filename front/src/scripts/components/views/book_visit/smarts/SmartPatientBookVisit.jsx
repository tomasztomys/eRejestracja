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
        describe: '',
        specialization: ''
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

  render() {
    let { values } = this.state;

    return (
      <PatientBookVisit
        values={ values }
        onChange={ this._onValuesChange.bind(this) }
      />
    );
  }
}