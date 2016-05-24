import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {
  DatePicker,
  Dropdown
} from 'ui';

import {
  PickerBox
} from '../';

import {
  BigCalendar
} from 'lib/big_calendar';

import * as workHoursReducer from 'reducers/work_hours';
import * as Actions from 'actions/Actions';


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
      downloadedWorkHoursId: 0
    };
  }

  componentDidMount() {
    this.getWorkHours(this.props.doctorId);
  }

  componentWillReceiveProps(nextProps) {
    let { doctorId, workHours } = nextProps;

    this.getWorkHours(doctorId);
    this.setState({
      availableTimes: this.generateFreeTerms(workHours.terms)
    });
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
    let { selectedDate, selectedTime } = this.props;

    if (selectedDate === undefined) {
      this.setError('date');
    }
    else if (selectedTime === '') {
      this.setError('time');
    }
    else {
      this.props.onNextStep();
    }
  }

  addMinutes(source, minutes) {
    let newDate = new Date(source);

    newDate.setMinutes(source.getMinutes() + minutes);
    return newDate;
  }

  generateFreeTerms(doctorWorkHours) {
    let freeTerms = [];
    let tempStart = new Date();
    let tempEnd = new Date();

    for (let workHours of doctorWorkHours) {
      let start = new Date(workHours.start);
      let end = new Date(workHours.end);

      tempStart.setTime(start.getTime());
      tempStart.setMinutes(0);
      tempEnd.setTime(start.getTime());
      tempEnd = this.addMinutes(start, 15);

      while(tempEnd < end) {
        freeTerms.push({
          index: freeTerms.length,
          start: tempStart,
          end: tempEnd
        });

        tempStart = this.addMinutes(tempStart, 15);
        tempEnd = this.addMinutes(tempEnd, 15);
      }
    }

    return freeTerms;
  }

  onSelectEvent(event) {
    this.props.onChangeDate(event);
  }

  render() {
    let { onBackStep } = this.props;
    let { labels, errors, availableTimes } = this.state;
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
          onSelectEvent={ this.onSelectEvent.bind(this) }
        />
      </PickerBox>
    );
  }
}

TermPickerBox.propTypes = {
  doctorId: PropTypes.number,
  selectedDate: PropTypes.object,
  onChangeDate: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func
};

function select(state) {
  state = state.toJS();
  return {
    workHours: workHoursReducer.getUserWorkHours(state)
  };
}

export default connect(select)(TermPickerBox);