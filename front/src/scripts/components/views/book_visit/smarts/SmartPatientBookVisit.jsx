import React, { Component, PropTypes } from 'react';

import { BookVisitBox } from './subcomponents/book_visit_box';

export default class PatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      values: {
        date: '',
        doctor: '',
        time: '',
        describe: ''
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
      <BookVisitBox
        values={ values }
        onChange={ this._onValuesChange.bind(this) }
      />
    );
  }
}

PatientBookVisit.propTypes = {

};