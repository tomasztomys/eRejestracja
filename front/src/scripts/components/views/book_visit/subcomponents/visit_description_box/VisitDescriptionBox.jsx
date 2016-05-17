import React, { Component, PropTypes } from 'react';

import {
  Input
} from 'ui';

import {
  PickerBox
} from '../';

export default class VisitDescriptionBox extends Component {
  constructor() {
    super();
    this.state = {
      labels: {
        description: 'Description',
      },
      errors: {
        description: ''
      },
      errorsMessages: {
        description: 'Please describe your visit.'
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

  render() {
    let { visitDescription, onDescriptionChange, onNextStep, onBackStep } = this.props;
    let { labels, errors } = this.state;

    return (
      <PickerBox
        title="Visit describe"
        subtitle="You can describe visit, this describe allow doctor to prepare to visit."
        onNextStep={ onNextStep }
        onBackStep={ onBackStep }
      >
        <Input
          label={ labels.description }
          value={ visitDescription }
          onChange={ onDescriptionChange }
          error={ errors.description }
        />
      </PickerBox>
    );
  }
}

VisitDescriptionBox.propTypes = {
  visitDescription: PropTypes.string,
  onDescriptionChange: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func
};