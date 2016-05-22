import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from 'ui';

import {
  AddWorkHoursBox,
  WorkHoursTable
} from './subcomponents';

export default class WorkHours extends Component {
  render() {
    return (
      <div>
        <Grid center>
          <GridItem xsSize="6">
            <AddWorkHoursBox />
          </GridItem>
        </Grid>
        <Grid center>
          <GridItem xsSize="6">
            <WorkHoursTable />
          </GridItem>
        </Grid>
      </div>
    );
  }
}
