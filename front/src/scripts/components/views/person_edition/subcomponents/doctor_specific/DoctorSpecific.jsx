import React, { Component, PropTypes } from 'react';

import {
  Dropdown
} from 'ui';

import style from './doctor_specific.scss';

export default class DoctorSpecific extends Component {
  constructor() {
    super();

    this.state = {
      source: {
        specialization: [
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
          },
          {
            label: 'pediatrician',
            value: 'pediatrician'
          }
        ]
      },
      labels: {
        specialization: 'Specialization'
      },
    };
  }

  render() {
    let { labels, source } = this.state;
    let { values, errors, onChange } = this.props;

    return (
      <div className={ style['doctor-specific'] }>
        <Dropdown
          label={ labels.specialization }
          error={ errors.specialization }
          source={ source.specialization }
          value={ values.specialization }
          onChange={ onChange.bind(this, 'specialization') }
        />
      </div>
    );
  }
}

const PropTypesStructure = {
  specialization: PropTypes.string
};

DoctorSpecific.propTypes = {
  errors: PropTypes.shape(PropTypesStructure),
  values: PropTypes.shape(PropTypesStructure),
  onChange: PropTypes.func,
};