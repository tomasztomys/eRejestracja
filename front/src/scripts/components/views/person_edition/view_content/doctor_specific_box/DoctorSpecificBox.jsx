import React, { Component, PropTypes } from 'react';

import {
  Card,
  CardTitle
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
      <Card className={ style['doctor-specific-box'] }>
        <CardTitle
          title="Doctor"
        />
        <DoctorSpecific
          values={ values }
          onChange={ onChange }
        />
      </Card>
    );
  }

}

DoctorSpecificBox.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func
};
