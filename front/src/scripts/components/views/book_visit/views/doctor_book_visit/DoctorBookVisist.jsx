import React, { Component, PropTypes } from 'react';

import { TermPickerBox } from '../../subcomponents';

import {
  CardWithHeader,
  Slider
} from 'lib/ui';

import {
  Grid,
  GridItem
} from 'lib/grid';

export default class DoctorBookVisit extends Component {
  render() {
    let {
      visitTime,
      doctorId,
      patientId,
      onChange,
      onAddVisit,
    } = this.props;

    return (
      <Grid center>
        <GridItem xsSize="12">
          <CardWithHeader
            title="Visit time"
            subtitle="You can change visit's time (default 30 minutes)"
          >
            <Slider
              label="Visit's time [minutes]"
              value={ visitTime }
              onChange={ onChange.bind(this, 'visitTime') }
              min={ 30 }
              max={ 240 }
              step={ 15 }
              snaps
            />
          </CardWithHeader>
          <TermPickerBox
            doctorId={ doctorId }
            patientId={ patientId }
            onNextStep={ onAddVisit }
            visitTime={ visitTime }
          />
        </GridItem>
      </Grid>
    );
  }
}

DoctorBookVisit.propTypes = {
  visitTime: PropTypes.number,
  onChange: PropTypes.func,
  onAddVisit: PropTypes.func,
  doctorId: PropTypes.number,
  patientId: PropTypes.number
};