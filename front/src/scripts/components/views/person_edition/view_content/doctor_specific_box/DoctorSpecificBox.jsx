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
      onChange
    } = this.props;

    return (
      <CardWithHeader
        className={ style['doctor-specific-box'] }
        title="Doctor"
      >
        <DoctorSpecific
          values={ values }
          onChange={ onChange }
        />
      </CardWithHeader>
    );
  }

}

DoctorSpecificBox.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func
};
