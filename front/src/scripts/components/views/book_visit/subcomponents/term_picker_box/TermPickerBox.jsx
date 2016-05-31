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
      downloadedWorkHoursId: 0,
      downloadedVisitsId: 0,
      showWarning: false
    };
  }

  componentDidMount() {
    let { doctorId } = this.props;

    this.getWorkHours(this.props.doctorId);
    this.getDoctorBusyTerms(doctorId);
  }

  componentWillReceiveProps(nextProps) {
    let { doctorId, workHours, visitTime, busyTerms } = nextProps;

    this.getWorkHours(doctorId);
    this.getDoctorBusyTerms(doctorId);

    this.setState({
      availableTimes: generateTerms(workHours.terms, busyTerms, visitTime)
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
    console.log(showWarning);
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