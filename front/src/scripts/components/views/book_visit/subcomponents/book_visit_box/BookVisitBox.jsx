import React, { Component, PropTypes } from 'react';

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
    return null;
  }
}

BookVisitBox.propTypes = {

};