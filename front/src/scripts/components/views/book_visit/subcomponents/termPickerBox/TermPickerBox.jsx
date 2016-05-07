import React, { Component, PropTypes } from 'react';

import {
  Input,
  Button,
  DatePicker,
  Card,
  Dropdown
} from '../../../../ui';

export default class BookVisitBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        date: 'Select date visit.',
        doctor: 'Choose a doctor you want to visit.',
        time: 'Choose time of visit.',
        describe: 'Describe your cause of visit.'
      },
      errors: {
        date: '',
        doctor: '',
        time: '',
        describe: ''
      },
      errorsMessages: {
        date: 'Please choose correct date.',
        doctor: 'Please choose doctor.',
        time: 'Wrong time of visit.',
        describe: 'Please describe your cause of visit.'
      }
    };
  }

  render() {
    let { labels, errors } = this.state;
    let { values, onChange, sources } = this.props;

    return (
      <Card
        subtitle="You can select doctor and book a visit on select term."
        title="Book visit to doctor."
      >
        <DatePicker
          label={ labels.date }
          value={ values.date }
          onChange={ onChange.bind(this, 'date') }
          error={ errors.date }
        />
        <Dropdown
          source={ sources.time }
          label={ labels.time }
          value={ values.time }
          error={ errors.time }
          onChange={ onChange.bind(this, 'time') }
        />
      </Card>
    );
  }
}

BookVisitBox.propTypes = {
  values: PropTypes.object,
  sources: PropTypes.object,
  onChange: PropTypes.func
};