import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PatientBookVisit from '../PatientBookVisit';

import * as userReducer from 'reducers/user';

import { convertToRfc3339 } from 'utilities';

import * as Actions from 'actions/Actions';

class SmartPatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      values: {
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
    let { values } = this.state;
    let { userId } = this.props;
    console.log(values);
    let parameters = {
      doctor_id: values.doctor,
      patient_id: userId,
      from: convertToRfc3339(values.selectedDate.start),
      to: convertToRfc3339(values.selectedDate.end)
    };

    this.props.dispatch(Actions.addVisit(parameters));
  }

  render() {
    let { values } = this.state;

    return (
      <PatientBookVisit
        values={ values }
        onChange={ this._onValuesChange.bind(this) }
        signUp={ this._onSignUp.bind(this) }
      />
    );
  }
}

SmartPatientBookVisit.propTypes = {
  userId: PropTypes.number
};

function select(state) {
  state = state.toJS();

  return {
    userId: userReducer.getUserId(state)
  };
}

export default connect(select)(SmartPatientBookVisit);