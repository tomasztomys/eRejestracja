import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import dateformat from 'dateformat';

import Switch from 'react-toolbox/lib/switch';

import {
  CardWithHeader,
  Table,
} from 'lib/ui';

import {
  Grid,
  GridItem
} from 'lib/grid';

import {
  BigCalendar
} from 'lib/big_calendar';

import * as userReducer from 'reducers/user';
import * as visitsReducer from 'reducers/visits';
import * as doctorsReducer from 'reducers/doctors';
import * as patientsReducer from 'reducers/patients';

import * as Actions from 'actions/Actions';

class VisitsList extends Component {

  constructor() {
    super();
    this.state = {
      source: [],
      selected: [],
      downloadedVisits: false,
      labels: {
        patient: 'Your visits',
        doctor: 'Your patients visits'
      },
      showCalendar: false,
    };
  }

  componentDidMount() {
    let { userId, userType } = this.props;

    this.props.dispatch(Actions.fetchPatientsList());
    this.props.dispatch(Actions.fetchDoctorsList());
    this.getVisitsList(userId, userType);
  }

  componentWillReceiveProps(nextProps) {
    let { userId, userType, doctorsNames, patientsNames, visitsData } = nextProps;

    this.getVisitsList(userId, userType);

    let source = visitsData[userId] ? visitsData[userId].map((item) => {
      return {
        id: item.id,
        doctor: doctorsNames[item.doctorId],
        patient: patientsNames[item.patientId],
        day: this.generateDateLabel(item.start),
        start: dateformat(item.start, 'HH:MM'),
        end: dateformat(item.end, 'HH:MM')
      };
    }) : [];

    this.setState({
      source
    });
  }

  getVisitsList(userId, userType) {
    if (userId > 0 && !this.state.downloadedVisits) {
      this.props.dispatch(Actions.getVisitsList(userId, userType));
      this.setState({
        downloadedVisits: true
      });
    }
  }

  generateDateLabel(date) {
    return dateformat(date, 'dddd, mmmm dS, yyyy');
  }

  onSelect(value) {
    this.setState({
      selected: value
    });
  }

  onDeleteItem(id) {
    this.props.dispatch(Actions.deleteVisit(id));
  }

  onChangeSwitch(value) {
    this.setState({
      showCalendar: value
    });
  }

  render() {
    let { source, selected, labels, showCalendar } = this.state;
    let { userType, visitsData, userId } = this.props;
    let model = {};

    if (userType === 'doctor') {
      model.patient = { type: String };
    }
    else {
      model.doctor = { type: String };
    }

    model.day = { type: String };
    model.start = { type: String };
    model.end = { type: String };

    let minHours = new Date();

    minHours.setHours(7);
    minHours.setMinutes(0);

    let events = visitsData[userId] ? visitsData[userId] : [];

    return (
      <Grid center>
        <GridItem xsSize="6">
          <CardWithHeader
            title={ labels[userType] }
          >
            <Switch
              checked={ showCalendar }
              label="Show calendar"
              onChange={ this.onChangeSwitch.bind(this) }
            />
            { showCalendar ?
              <BigCalendar
                defaultDate={ new Date() }
                events={ events }
                min={ minHours }
                defaultView="month"
              /> :
              <Table
                model={ model }
                source={ source }
                onSelect={ this.onSelect.bind(this) }
                selected={ selected }
                selectable={ false }
                onDeleteItem={ this.onDeleteItem.bind(this) }
              />
            }
          </CardWithHeader>
        </GridItem>
      </Grid>
    );
  }
}

VisitsList.propTypes = {
  userId: PropTypes.number,
  visitsData: PropTypes.array,
  userType: PropTypes.oneOf([ 'doctor', 'patient' ]),
  doctorsNames: PropTypes.object,
  patientsNames: PropTypes.object
};

VisitsList.defaultProps = {
  doctorsNames: {},
  patientsNames: {}
};

function select(state) {
  state = state.toJS();
  return {
    userId: userReducer.getUserId(state),
    userType: userReducer.getUserType(state),
    visitsData: visitsReducer.getVisitsData(state),
    doctorsNames: doctorsReducer.getDoctorsNames(state),
    patientsNames: patientsReducer.getPatientsNames(state)
  };
}

export default connect(select)(VisitsList);