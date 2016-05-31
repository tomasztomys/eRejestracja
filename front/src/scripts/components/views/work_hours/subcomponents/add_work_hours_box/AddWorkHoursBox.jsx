import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import {
  CardWithHeader,
  TimePicker,
  Autocomplete
} from 'lib/ui';

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
      sourceDays: {},
      selectedDays: [],
      values: this.initValues(),
      errors: {
        startTime: '',
        endTime: '',
        days: ''
      },
      errorsMessages: {
        startTime: 'You have to choose start time.',
        endTime: 'You have to choose end time.',
        days: 'You need to select days to add work hours.',
        endTimeValue: 'End time must be after start time'
      },
      validations: {
        startTime: true,
        endTime: true,
        days: false
      }
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

  initValues() {
    let startTime = new Date(0);
    let endTime = new Date(0);

    startTime.setHours(8);
    endTime.setHours(18);

    return {
      startTime,
      endTime,
      days: []
    };
  }

  generateSourceDays(numberOfDays, filledWorkhours) {
    this.setState({
      sourceDays: this.generateDays(numberOfDays, filledWorkhours)
    });
  }

  onValidation(key, value) {
    let validation = value.toString().length > 0;
    let { validations, errors, errorsMessages } = this.state;

    validations[key] = validation;
    errors[key] = validation ? '' : errorsMessages[key];

    this.setState({
      validations,
      errors
    });
  }

  onChange(key, value) {
    let { values } = this.state;

    this.onValidation(key, value);

    values[key] = value;
    this.setState({
      values,
    });
  }

  onValidationEndTime(value) {
    let { values, validations, errors, errorsMessages } = this.state;
    let validation = value.toString().length > 0;
    let validationValue = value > values.startTime;

    validations.endTime = validation && validationValue;
    errors.endTime = validation ? '' : `${ errorsMessages.endTime } `;
    errors.endTime += validationValue ? '' : errorsMessages.endTimeValue;

    this.setState({
      validations,
      errors
    });
  }

  onChangeEndTime(value) {
    let { values } = this.state;

    values.endTime = value;
    this.setState({
      values,
    });
    this.onValidationEndTime(value);
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

  showErrorMessages() {
    let { validations, errors, errorsMessages } = this.state;

    for (let key in validations) {
      if (!validations[key]) {
        errors[key] = errorsMessages[key];
      }
    }

    this.setState({
      errors
    });
  }

  checkValidations() {
    let { validations } = this.state;
    let validation = true;

    for (let key in validations) {
      let value = validations[key];

      if (validation) {
        validation = value;
      }
    }

    return (validation);
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
    if (this.checkValidations()) {
      let { values } = this.state;
      let { userId } = this.props;
      let data = [];

      for (let item of values.days) {
        let start = mergeDateWithTime(item, values.startTime);
        let end = mergeDateWithTime(item, values.endTime);

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
        selectedDays: [],
        values: this.initValues()
      });
    }
    else {
      this.showErrorMessages();
    }
  }

  render() {
    let { values, errors } = this.state;
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
          value={ values.days }
          onChange={ this.onChange.bind(this, 'days') }
          error={ errors.days }
        />
        <TimePicker
          label="Start work time"
          onChange={ this.onChange.bind(this, 'startTime') }
          value={ values.startTime }
          error={ errors.startTime }
        />
        <TimePicker
          label="End work"
          onChange={ this.onChangeEndTime.bind(this) }
          value={ values.endTime }
          error={ errors.endTime }
        />

      </CardWithHeader>

    );
  }
}
AddWorkHoursBox.propTypes = {
  userId: PropTypes.number,
  filledWorkhours: PropTypes.array
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state),
    filledWorkhours: workHoursReducer.getUserWorkHours(state).terms
  };
}

export default connect(select)(AddWorkHoursBox);