import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  PickerBox
} from '../';

import {
  BigCalendar
} from 'lib/big_calendar';

import dateFormat from 'dateformat';

import * as workHoursReducer from 'reducers/work_hours';
import * as visitsReducer from 'reducers/visits';
import * as Actions from 'actions/Actions';

import generateTerms from './generateTerms.jsx';

import style from './term_picker.scss';

class TermPickerBox extends Component {
  constructor() {
    super();

    this.state = {
      source: [],
      selected: {},
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
      downloadedDoctorWorkHoursId: 0,
      downloadedDoctorVisits: 0,
      downloadedPatientVisits: 0,
      showWarning: false
    };
  }

  componentDidMount() {
    let { doctorId, patientId } = this.props;

    this.getWorkHours(doctorId);

    this.getDoctorVisits(doctorId);
    this.getPatientVisits(patientId);
  }

  componentWillReceiveProps(nextProps) {
    let { doctorId, patientId, workHours, visitTime, visitsData } = nextProps;

    this.getWorkHours(doctorId);
    this.getDoctorVisits(doctorId);
    this.getPatientVisits(patientId);

    let doctorBusyTerms = visitsData[doctorId] ? visitsData[doctorId] : [];
    let patientBusyTerms = visitsData[patientId] ? visitsData[patientId] : [];

    let busyTerms = doctorBusyTerms.concat(patientBusyTerms);

    this.setState({
      availableTimes: generateTerms(workHours.terms, busyTerms, visitTime)
    });
  }

  getPatientVisits(id) {
    if (id !== this.state.downloadedPatientVisits) {
      this.props.dispatch(Actions.getVisitsList(id, 'patient'));

      this.setState({
        downloadedPatientVisits: id
      });
    }
  }

  getDoctorVisits(id) {
    if (id !== this.state.downloadedDoctorVisits) {
      this.props.dispatch(Actions.getVisitsList(id, 'doctor'));

      this.setState({
        downloadedDoctorVisits: id
      });
    }
  }

  getWorkHours(id) {
    if (id !== this.state.downloadedDoctorWorkHoursId) {
      this.props.dispatch(Actions.getWorkHours(id));

      this.setState({
        downloadedDoctorWorkHoursId: id
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
    let { selected } = this.state;

    if (selected.start) {
      this.props.onNextStep(selected);
    }
    else {
      this.setState({
        showWarning: true
      });
    }
  }

  onSelectEvent(event) {
    this.setState({
      selected: event
    });
  }

  generateSelectedDateLabel(date) {
    if (date.start) {
      let day = dateFormat(date.start, 'dddd, mmmm dS, yyyy');
      let start = dateFormat(date.start, 'h:MM');
      let end = dateFormat(date.end, 'h:MM');

      return `${ day } ${ start } - ${ end }`;
    }
    else {
      return 'You do not select any date';
    }
  }

  render() {
    let { onBackStep } = this.props;
    let { availableTimes, showWarning } = this.state;
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
        <p>Yuor select term:</p>
        <p className={ { [style['warning']]: showWarning } }>
          { this.generateSelectedDateLabel(this.state.selected) }
        </p>
      </PickerBox>
    );
  }
}

TermPickerBox.propTypes = {
  doctorId: PropTypes.number,
  patientId: PropTypes.number,
  onChangeDate: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
};

function select(state) {
  state = state.toJS();

  return {
    workHours: workHoursReducer.getUserWorkHours(state),
    visitsData: visitsReducer.getVisitsData(state)
  };
}

export default connect(select)(TermPickerBox);