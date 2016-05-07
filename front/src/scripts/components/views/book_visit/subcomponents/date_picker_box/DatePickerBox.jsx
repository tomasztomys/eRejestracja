import React, { Component, PropTypes } from 'react';

import {
  Card,
  Dropdown
} from '../../../../ui';

export default class DatePickerBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        day: 'Day of vist',
        time: 'Time of visit'
      },
      errors: {
        day: '',
        time: ''
      },
      errorsMessages: {
        day: 'Please choose day of visit.',
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

  _onSignUp() {

  }

  render() {
    let { disabled } = this.props;
    let actions = [
      {
        label: 'Sign up for a visit',
        onClick: this._onSignUp.bind(this),
        disabled: disabled
      }
    ];

    return (
      <Card
        title="Select term of Visit"
        actions={ actions }
      />
    );
  }
}

DatePickerBox.propTypes = {
  disabled: PropTypes.bool
};