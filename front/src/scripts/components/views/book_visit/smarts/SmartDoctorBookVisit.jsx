import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as userReducer from 'reducers/user';

import { convertToRfc3339 } from 'utilities';

import * as Actions from 'actions/Actions';
import Paths from 'constants/PathsConstants';

import { DoctorBookVisit } from '../views/doctor_book_visit';

class SmartDoctorBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      visitTime: 30
    };
  }

  onChange(type, value) {
    this.setState({
      [type]: value
    });
  }

  onAddVisit(selectedDate) {
    let { userId } = this.props;
    let parameters = {
      'doctor_id': userId,
      'patient_id': this.props.params.id,
      from: convertToRfc3339(selectedDate.start),
      to: convertToRfc3339(selectedDate.end)
    };

    Actions.addVisit(parameters, this.props.dispatch).then((data) => {
      if (data) {
        this.context.router.push(Paths.visits);
      }
    });
  }

  render() {
    let { selectedDate, visitTime } = this.state;
    let { userId } = this.props;

    return (
      <DoctorBookVisit
        selectedDate={ selectedDate }
        visitTime={ visitTime }
        userId={ userId }
        onAddVisit={ this.onAddVisit.bind(this) }
        onChange={ this.onChange.bind(this) }
      />
    );
  }
}

SmartDoctorBookVisit.propTypes = {
  userId: PropTypes.number,
  params: PropTypes.string
};

SmartDoctorBookVisit.contextTypes = {
  router: React.PropTypes.object
};

function select(state) {
  state = state.toJS();

  return {
    userId: userReducer.getUserId(state)
  };
}

export default connect(select)(SmartDoctorBookVisit);