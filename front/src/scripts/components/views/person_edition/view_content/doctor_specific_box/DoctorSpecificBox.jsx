import React, { Component, PropTypes } from 'react';

import {
  CardWithHeader,
} from '../../../../ui';

import { DoctorSpecific } from '../../subcomponents/doctor_specific';

import style from './doctor_specific_box.scss';

export default class DoctorSpecificBox extends Component {
  render() {
    let {
      values,
      errors,
      onChange,
      onSave
    } = this.props;

    let actions = [
      {
        label: 'Save',
        onClick: onSave
      }
    ];

    return (
      <CardWithHeader
        className={ style['doctor-specific-box'] }
        title="Doctor"
        actions={ actions }
      >
        <DoctorSpecific
          values={ values }
          errors={ errors }
          onChange={ onChange }
        />
      </CardWithHeader>
    );
  }

}
const PropTypesStructure = {
  specialization: PropTypes.string
};

DoctorSpecificBox.propTypes = {
  errors: PropTypes.shape(PropTypesStructure),
  values: PropTypes.shape(PropTypesStructure),
  onChange: PropTypes.func,
  onSave: PropTypes.func
};
