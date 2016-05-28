import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  PickerBox
} from '../';

import {
  BigCalendar
} from 'lib/big_calendar';

import * as workHoursReducer from 'reducers/work_hours';
import * as visitsReducer from 'reducers/visits';
import * as Actions from 'actions/Actions';

import generateTerms from './generateTerms.jsx';

class TermPickerBox extends Component {
  constructor() {
    super();

    this.state = {
      source: [],
      availableTimes: [],
      labels: {
        date: 'Day of vist',
        time: 'Time of visit'
      },
      errors: {
        date: '',
        time: ''
      },
      errorsMessages: {
        date: 'Please choose day of visit.',
        time: 'Please choose time of visit.'
      },
      downloadedWorkHoursId: 0,
      downloadedVisitsId: 0,
      timeVisitMinutes: 15,
    };
  }

  componentDidMount() {
    let { doctorId } = this.props;

    this.getWorkHours(this.props.doctorId);
    this.getDoctorBusyTerms(doctorId);
  }

  componentWillReceiveProps(nextProps) {
    let { doctorId, workHours, visitTime, busyTerms } = nextProps;
    let { timeVisitMinutes } = this.state;

    this.getWorkHours(doctorId);
    this.getDoctorBusyTerms(doctorId);

    let time = (visitTime >= 15) ? visitTime : timeVisitMinutes;

    this.setState({
      availableTimes: generateTerms(workHours.terms, busyTerms, time)
    });
  }

  getDoctorBusyTerms(id) {
    if (id !== this.state.downloadedVisitsId) {
      this.props.dispatch(Actions.getVisitsList(id, 'doctor'));

      this.setState({
        downloadedVisitsId: id
      });
    }
  }

  getWorkHours(id) {
    if (id !== this.state.downloadedWorkHoursId) {
      this.props.dispatch(Actions.getWorkHours(id));

      this.setState({
        downloadedWorkHoursId: id
      });
    }
  }

  setError(key) {
    let { errors, errorsMessages } = this.state;

    errors[key] = errorsMessages[key];
    this.setState({
      errors
    });
  }

  onNextStep() {
    let { availableTimes } = this.state;
    let selecteds = availableTimes.filter((item) => {
      return item.selected;
    });

    if (selecteds.length > 0) {
      this.props.onChangeDate(selecteds[0]);
      this.props.onNextStep();
    }
  }

  cleanSelectedEvents(events) {
    return events.map((item) => {
      item.selected = false;
      return item;
    });
  }

  onSelectEvent(event) {
    let source = this.state.availableTimes;
    source = this.cleanSelectedEvents(source);

    source[event.index].selected = true;
    this.setState({
      availableTimes: source
    });
  }

  render() {
    let { onBackStep } = this.props;
    let { availableTimes } = this.state;
    let minHours = new Date();

    minHours.setHours(7);
    minHours.setMinutes(0);

    return (
      <PickerBox
        title="Select term of Visit"
        onNextStep={ this.onNextStep.bind(this) }
        onBackStep={ onBackStep }
      >
        <BigCalendar
          defaultDate={ new Date() }
          events={ availableTimes }
          min={ minHours }
          defaultView="month"
          onSelectEvent={ this.onSelectEvent.bind(this) }
        />
      </PickerBox>
    );
  }
}

TermPickerBox.propTypes = {
  doctorId: PropTypes.number,
  onChangeDate: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
  busyTerms: PropTypes.array
};

function select(state) {
  state = state.toJS();

  return {
    workHours: workHoursReducer.getUserWorkHours(state),
    busyTerms: visitsReducer.getVisitsData(state).visits
  };
}

export default connect(select)(TermPickerBox);