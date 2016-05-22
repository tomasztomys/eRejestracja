import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  Table
} from 'ui';

import * as userReducer from 'reducers/user';
import * as doctorsReducer from 'reducers/doctors';

import * as Actions from 'actions/Actions';

class WorkHoursTable extends Component {
  render() {

    return (
      <CardWithHeader
        title={ "Work hours" }
        subtitle={ "Select which hours you seeing patients" }
      >
        Work hours
      </CardWithHeader>

    );
  }
}
WorkHoursTable.propTypes = {
  userId: PropTypes.number
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state)
  };
}

export default connect(select)(WorkHoursTable);