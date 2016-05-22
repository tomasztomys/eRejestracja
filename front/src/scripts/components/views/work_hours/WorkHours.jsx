import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from 'ui';

import {
  AddWorkHoursBox
} from './subcomponents';

export default class WorkHours extends Component {
  render() {
    return (
      <Grid center>
        <GridItem xsSize="6">
          <AddWorkHoursBox />
        </GridItem>
      </Grid>
    );
  }
}
