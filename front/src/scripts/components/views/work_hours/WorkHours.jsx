import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  GridItem,
  CardWithHeader,
  TimePicker
} from 'ui';

import {
  getDaysInMonth,
  convertToRfc3339
} from 'utilities';

import * as userReducer from 'reducers/user';

import * as Actions from 'actions/Actions';

class WorkHours extends Component {
  constructor() {
    super();

    this.state = {
      startTime: new Date(),
      endTime: new Date(),
      sourceMonth: [],
      sourceDays: [],
      sourceYear: [],
      selectedMonth: undefined,
      selectedYear: undefined,
      selectedDay: undefined
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  onAddTerm() {
    let { startTime, endTime } = this.state;
    let { userId } = this.props;
    let parameters = {
      from: convertToRfc3339(startTime),
      to: convertToRfc3339(endTime)
    };

    console.log(Actions);

    this.props.dispatch(Actions.addWorkHours(parameters, userId));
  }

  render() {
    let actions = [
      {
        label: 'Add',
        onClick: this.onAddTerm.bind(this)
      }
    ];

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title={ "Work hours" }
            subtitle={ "Select which hours you seeing patients" }
            actions={ actions }
          >
            <TimePicker
              label="Start work time"
              onChange={ this.onChange.bind(this, 'startTime') }
              value={ this.state.startTime }
            />
            <TimePicker
              label="End work"
              onChange={ this.onChange.bind(this, 'endTime') }
              value={ this.state.endTime }
            />

          </CardWithHeader>
        </GridItem>
      </Grid>

    );
  }
}
WorkHours.propTypes = {
  userId: PropTypes.number
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state)
  };
}

export default connect(select)(WorkHours);