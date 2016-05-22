import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  Grid,
  GridItem,
  CardWithHeader,
  TimePicker,
  Autocomplete
} from 'ui';

import {
  convertToRfc3339,
  getNextDays
} from 'utilities';

import * as userReducer from 'reducers/user';

import * as Actions from 'actions/Actions';

class WorkHours extends Component {
  constructor() {
    super();

    this.state = {
      startTime: new Date(),
      endTime: new Date(),
      sourceDays: this.generateDays(60),
      selectedDays: []
    };
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  generateDays(numberOfDays) {
    let days = getNextDays(new Date(), numberOfDays);
    let sourceDays = {};

    for (let item of days) {
      sourceDays[item] = this.generateDateLabel(item);
    }
    return sourceDays;
  }

  onAddTerms() {
    let { startTime, endTime, selectedDays } = this.state;
    let { userId } = this.props;
    let data = [];

    for (let item of selectedDays) {
      let start = new Date();

      start.setTime(Date.parse(item));
      start.setHours(startTime.getHours());
      start.setMinutes(startTime.getMinutes());

      let end = new Date();

      end.setTime(Date.parse(item));
      end.setHours(endTime.getHours());
      end.setMinutes(endTime.getMinutes());

      data.push({
        from: convertToRfc3339(start),
        to: convertToRfc3339(end)
      });
    }

    this.props.dispatch(Actions.addWorkHours(data, userId));
  }

  render() {
    let actions = [
      {
        label: 'Add',
        onClick: this.onAddTerms.bind(this)
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
            <Autocomplete
              label="Days"
              source={ this.state.sourceDays }
              value={ this.state.selectedDays }
              onChange={ this.onChange.bind(this, 'selectedDays') }
            />
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