import React, { Component, PropTypes } from 'react';

import { TermPickerBox } from '../../subcomponents';

import {
  Input,
  CardWithHeader
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
      userId,
      onChange,
      onAddVisit,
    } = this.props;

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title="Visit time"
            subtitle="You can change visit's time (default 30 minutes)"
          >
            <Input
              label="Visit's time [minutes]"
              value={ visitTime }
              onChange={ onChange.bind(this, 'visitTime') }
              error={ visitTime < 15 ?
                'Wrong visit time, (min 15 minutes)' : '' }
              type="number"
            />
          </CardWithHeader>
          <TermPickerBox
            selectedDate={ selectedDate }
            onChangeDate={ onChange.bind(this, 'selectedDate') }
            doctorId={ userId }
            onNextStep={ onAddVisit.bind(this) }
            visitTime={ visitTime }
          />
        </GridItem>
      </Grid>
    );
  }
}

DoctorBookVisit.propTypes = {
  userId: PropTypes.number,
  selectedDate: PropTypes.string,
  visitTime: PropTypes.number,
  onChange: PropTypes.func,
  onAddVisit: PropTypes.func,
};