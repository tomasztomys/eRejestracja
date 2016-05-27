import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PatientBookVisit from '../views/patient_book_visit';

import * as userReducer from 'reducers/user';

import { convertToRfc3339 } from 'utilities';

import * as Actions from 'actions/Actions';
import Paths from 'constants/PathsConstants';

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
    let parameters = {
      doctor_id: values.doctor,
      patient_id: userId,
      from: convertToRfc3339(values.selectedDate.start),
      to: convertToRfc3339(values.selectedDate.end)
    };

    Actions.addVisit(parameters, this.props.dispatch).then((data) => {
      if (data) {
        this.context.router.push(Paths.visits);
      }
    });
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

SmartPatientBookVisit.contextTypes = {
  router: React.PropTypes.object
};

function select(state) {
  state = state.toJS();

  return {
    userId: userReducer.getUserId(state)
  };
}

export default connect(select)(SmartPatientBookVisit);