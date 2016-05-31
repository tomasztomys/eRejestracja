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
      selectedDate,
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
              max={ 180 }
              step={ 15 }
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
  userId: PropTypes.number,
  visitTime: PropTypes.number,
  onChange: PropTypes.func,
  onAddVisit: PropTypes.func,
};