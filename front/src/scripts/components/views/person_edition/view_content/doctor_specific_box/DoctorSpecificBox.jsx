import React, { Component, PropTypes } from 'react';

import {
  CardWithClosing,
} from 'ui';

import { DoctorSpecific } from '../../subcomponents/doctor_specific';

import style from './doctor_specific_box.scss';

export default class DoctorSpecificBox extends Component {
  render() {
    let {
      values,
      errors,
      onChange,
      onSave,
      open,
      onToogleBox
    } = this.props;

    let actions = [
      {
        label: 'Save',
        onClick: onSave
      }
    ];

    return (
      <CardWithClosing
        className={ style['doctor-specific-box'] }
        title="Change docotor specifics data"
        actions={ actions }
        open={ open }
        onToogleBox={ onToogleBox }
      >
        <DoctorSpecific
          values={ values }
          errors={ errors }
          onChange={ onChange }
        />
      </CardWithClosing>
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
  onSave: PropTypes.func,
  open: PropTypes.bool,
  onToogleBox: PropTypes.func
};
