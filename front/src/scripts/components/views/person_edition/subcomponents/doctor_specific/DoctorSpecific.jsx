import React, { Component, PropTypes } from 'react';

import {
  Input,
  Dropdown
} from '../../../../ui';

import style from './doctor_specific.scss';

export default class DoctorSpecific extends Component {
  constructor() {
    super();

    this.state = {
      source: [
        {
          label: 'dentist',
          value: 'dentist'
        },
        {
          label: 'surgeon',
          value: 'surgeon'
        },
        {
          label: 'dermatologist',
          value: 'dermatologist'
        }
      ],
      labels: {
        specialization: 'specialization'
      },
      errors: {
        specialization: ''
      },
      errorsMessages: {
        specialization: 'Enter your specialization',
      }
    };
  }

  _onDropdownChange(type, value) {
    this.props.onChange(type, value);
  }

  render() {
    let { labels, errors, source } = this.state;
    let { values } = this.props;

    return (
      <div className={ style['doctor-specific'] }>
        <Dropdown
          label={ labels.specialization }
          error={ errors.specialization }
          source={ source }
          value={ values.specialization }
          onChange={ this._onDropdownChange.bind(this, 'specialization') }
        />
      </div>
    );
  }
}

DoctorSpecific.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
};