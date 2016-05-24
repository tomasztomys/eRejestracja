import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  TimePicker,
  Autocomplete
} from 'ui';

import {
  convertToRfc3339,
  getNextDays,
  mergeDateWithTime
} from 'utilities';

import * as userReducer from 'reducers/user';
import * as workHoursReducer from 'reducers/work_hours';

import * as Actions from 'actions/Actions';

class AddWorkHoursBox extends Component {
  constructor() {
    super();
    this.state = {
      startTime: undefined,
      endTime: undefined,
      sourceDays: {},
      selectedDays: []
    };
  }

  componentDidMount() {
    let { filledWorkhours } = this.props;

    this.generateSourceDays(60, filledWorkhours);
  }

  componentWillReceiveProps(nextProps) {
    let { filledWorkhours } = nextProps;

    this.generateSourceDays(60, filledWorkhours);
  }

  generateSourceDays(numberOfDays, filledWorkhours) {
    this.setState({
      sourceDays: this.generateDays(numberOfDays, filledWorkhours)
    });
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  removeFilledDays(days, filledDays) {
    return days.filter((day) => {
      for (let filled of filledDays) {
        if ((day.getDate() === filled.start.getDate()) &&
          (day.getMonth() === filled.start.getMonth()) &&
          (day.getFullYear() === filled.start.getFullYear())) {
          return false;
        }
      }

      return true;
    });
  }

  generateDays(numberOfDays, filledWorkhours) {

    let days = getNextDays(new Date(), numberOfDays);
    let noFillDays = this.removeFilledDays(days, filledWorkhours);
    let sourceDays = {};

    for (let item of noFillDays) {
      sourceDays[item] = this.generateDateLabel(item);
    }
    return sourceDays;
  }

  onAddTerms() {
    let { startTime, endTime, selectedDays } = this.state;
    let { userId } = this.props;
    let data = [];

    for (let item of selectedDays) {
      let start = mergeDateWithTime(item, startTime);
      let end = mergeDateWithTime(item, endTime);

      data.push({
        from: convertToRfc3339(start),
        to: convertToRfc3339(end)
      });
    }

    Actions.addWorkHours(data, userId, this.props.dispatch).then((data) => {
      if (data) {
        this.props.dispatch(Actions.getWorkHours(userId));
      }
    });

    this.setState({
      startTime: undefined,
      endTime: undefined,
      sourceDays: {},
      selectedDays: []
    });
  }

  render() {
    let actions = [
      {
        label: 'Add',
        onClick: this.onAddTerms.bind(this)
      }
    ];

    return (
      <CardWithHeader
        title={ "Add Work hours" }
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

    );
  }
}
AddWorkHoursBox.propTypes = {
  userId: PropTypes.number,
  filledWorkhours : PropTypes.array
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state),
    filledWorkhours: workHoursReducer.getUserWorkHours(state).terms
  };
}

export default connect(select)(AddWorkHoursBox);