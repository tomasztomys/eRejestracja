import React, { Component, PropTypes } from 'react';

import {
  DatePicker,
  Dropdown
} from 'ui';

import {
  PickerBox
} from '../';

import {
  BigCalendar
} from 'lib/big_calendar';

export default class TermPickerBox extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      availableTimes: [],
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

  onSelectEvent(event) {
    this.props.onChangeDate(event);
  }

  render() {
    let { onBackStep } = this.props;
    let { labels, errors, availableTimes } = this.state;

    let minHours = new Date();

    minHours.setHours(7);
    minHours.setMinutes(0);

    return (
      <PickerBox
        title="Select term of Visit"
        onNextStep={ this.onNextStep.bind(this) }
        onBackStep={ onBackStep }
      >
        <BigCalendar
          defaultDate={ new Date() }
          events={ availableTimes }
          min={ minHours }
          onSelectEvent={ this.onSelectEvent.bind(this) }
        />
      </PickerBox>
    );
  }
}

TermPickerBox.propTypes = {
  selectedDate: PropTypes.object,
  onChangeDate: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func
};