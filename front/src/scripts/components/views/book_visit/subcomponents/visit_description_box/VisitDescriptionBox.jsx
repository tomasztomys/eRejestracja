import React, { Component, PropTypes } from 'react';

import {
  Card,
  Input
} from '../../../../ui';

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

  _onSignUp() {
    this.props.onAccept();
  }

  render() {
    let { disabled, visitDescription, onDescriptionChange } = this.props;
    let { labels, errors } = this.state;
    let actions = [
      {
        label: 'Sign up for a visit',
        onClick: this._onSignUp.bind(this),
        disabled: disabled
      }
    ];

    return (
      <Card
        title="Visit describe"
        subtitle="You can describe visit, this describe allow doctor to prepare to visit."
        actions={ actions }
      >
        <Input
          label={ labels.description }
          value={ visitDescription }
          onChange={ onDescriptionChange }
          error={ errors.description }
          disabled={ disabled }
        />
      </Card>
    );
  }
}

VisitDescriptionBox.propTypes = {
  disabled: PropTypes.bool,
  visitDescription: PropTypes.string,
  onDescriptionChange: PropTypes.func,
  onAccept: PropTypes.func
};