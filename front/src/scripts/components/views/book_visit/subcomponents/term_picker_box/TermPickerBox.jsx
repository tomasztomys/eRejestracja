import React, { Component, PropTypes } from 'react';

import {
  Card,
  DatePicker,
  Dropdown
} from '../../../../ui';

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

  _onAccept() {
    let { selectedDate, selectedTime } = this.props;

    if (selectedDate === undefined) {
      this.setError('date');
    }
    else if (selectedTime === '') {
      this.setError('time');
    }
    else {
      this.props.onAccept();
    }
  }

  render() {
    let { disabled, selectedDate, onDateChange,
      availableTimes, selectedTime, onTimeChange } = this.props;
    let { labels, errors } = this.state;
    let actions = [
      {
        label: 'Accept',
        onClick: this._onAccept.bind(this),
        disabled: disabled
      }
    ];

    return (
      <Card
        title="Select term of Visit"
        actions={ actions }
      >
        <DatePicker
          label={ labels.date }
          error={ errors.date }
          value={ selectedDate }
          onChange={ onDateChange }
          disabled={ disabled }
        />
        <Dropdown
          label={ labels.time }
          value={ selectedTime }
          source={ availableTimes }
          error={ errors.time }
          onChange={ onTimeChange }
          disabled={ disabled || !selectedDate }
        />
      </Card>
    );
  }
}

TermPickerBox.propTypes = {
  disabled: PropTypes.bool,
  selectedDate: PropTypes.object,
  onDateChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  availableTimes: PropTypes.array,
  selectedTime: PropTypes.string,
  onAccept: PropTypes.func
};