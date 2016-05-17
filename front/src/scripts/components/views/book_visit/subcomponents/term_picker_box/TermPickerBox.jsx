import React, { Component, PropTypes } from 'react';

import {
  DatePicker,
  Dropdown
} from 'ui';

import {
  PickerBox
} from '../';

export default class TermPickerBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        date: 'Day of vist',
        time: 'Time of visit'
      },
      errors: {
        date: '',
        time: ''
      },
      errorsMessages: {
        date: 'Please choose day of visit.',
        time: 'Please choose time of visit.'
      }
    };
  }

  setError(key) {
    let { errors, errorsMessages } = this.state;

    errors[key] = errorsMessages[key];
    this.setState({
      errors
    });
  }

  onNextStep() {
    let { selectedDate, selectedTime } = this.props;

    if (selectedDate === undefined) {
      this.setError('date');
    }
    else if (selectedTime === '') {
      this.setError('time');
    }
    else {
      this.props.onNextStep();
    }
  }

  render() {
    let { selectedDate, onDateChange,
      availableTimes, selectedTime, onTimeChange, onNextStep, onBackStep } = this.props;
    let { labels, errors } = this.state;

    return (
      <PickerBox
        title="Select term of Visit"
        onNextStep={ this.onNextStep.bind(this) }
        onBackStep={ onBackStep }
      >
        <DatePicker
          label={ labels.date }
          error={ errors.date }
          value={ selectedDate }
          onChange={ onDateChange }
        />
        <Dropdown
          label={ labels.time }
          value={ selectedTime }
          source={ availableTimes }
          error={ errors.time }
          onChange={ onTimeChange }
          disabled={ !selectedDate }
        />
      </PickerBox>
    );
  }
}

TermPickerBox.propTypes = {
  selectedDate: PropTypes.object,
  onDateChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  availableTimes: PropTypes.array,
  selectedTime: PropTypes.string,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func
};