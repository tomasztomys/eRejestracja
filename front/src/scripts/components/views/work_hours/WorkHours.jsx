import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from 'lib/grid';

import {
  AddWorkHoursBox,
  WorkHoursTable
} from './subcomponents';

export default class WorkHours extends Component {
  render() {
    return (
      <div>
        <Grid center>
          <GridItem
            xsSize="11"
            smSize="9"
            mdSize="7"
            lgSize="6"
          >
            <AddWorkHoursBox />
          </GridItem>
        </Grid>
        <Grid center>
          <GridItem
            xsSize="11"
            smSize="9"
            mdSize="7"
            lgSize="6"
          >
            <WorkHoursTable />
          </GridItem>
        </Grid>
      </div>
    );
  }
}
