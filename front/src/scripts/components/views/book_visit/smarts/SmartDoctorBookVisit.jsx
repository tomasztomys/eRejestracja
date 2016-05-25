import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PatientBookVisit from '../PatientBookVisit';

import * as userReducer from 'reducers/user';

import { convertToRfc3339 } from 'utilities';

import { TermPickerBox } from '../subcomponents';

import * as Actions from 'actions/Actions';
import Paths from 'constants/PathsConstants';

import {
  Grid,
  GridItem,
  Input,
  CardWithHeader
} from 'ui';

class SmartDoctorBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      selectedDate: undefined,
      visitTime: 15
    };
  }

  onChange(type, value) {
    this.setState({
      [type]: value
    });
  }

  _onSignUp() {
    let { selectedDate } = this.state;
    let { userId } = this.props;
    let parameters = {
      doctor_id: userId,
      patient_id: this.props.params.id,
      from: convertToRfc3339(selectedDate.start),
      to: convertToRfc3339(selectedDate.end)
    };

    Actions.addVisit(parameters, this.props.dispatch).then((data) => {
      if (data) {
        this.context.router.push(Paths.visits);
      }
    });
  }

  render() {
    let { selectedDate, visitTime } = this.state;
    let { userId } = this.props;

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title="Visit time"
            subtitle="You can change visit's time (default 30 minutes)"
          >
            <Input
              label="Visit's time (15-60 minutes)"
              value={ visitTime }
              onChange={ this.onChange.bind(this, 'visitTime') }
              error={ (visitTime < 15 || visitTime >= 60) ? 'Wrong visit time' : '' }
              type="number"
            />
          </CardWithHeader>
          <TermPickerBox
            selectedDate={ selectedDate }
            onChangeDate={ this.onChange.bind(this, 'selectedDate') }
            doctorId={ userId }
            onNextStep={ this._onSignUp.bind(this) }
            visitTime={ visitTime }
          />
        </GridItem>
      </Grid>
    );
  }
}

SmartDoctorBookVisit.propTypes = {
  userId: PropTypes.number
};

SmartDoctorBookVisit.contextTypes = {
  router: React.PropTypes.object
};

function select(state) {
  state = state.toJS();

  return {
    userId: userReducer.getUserId(state)
  };
}

export default connect(select)(SmartDoctorBookVisit);