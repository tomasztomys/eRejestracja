import React, { Component, PropTypes } from 'react';

import {
  Grid,
  GridItem
} from '../../ui';

import {
  DoctorPickerBox,
  TermPickerBox
} from './subcomponents';

export default class PatientBookVisit extends Component {
  constructor() {
    super();
    this.state = {
      disabled: {
        doctorPicker: false,
        datePicker: true
      },
      sources: {
        time: [
          {
            label: '6:15',
            value: '6/15'
          },
          {
            label: '6:30',
            value: '6/30'
          },
          {
            label: '7:45',
            value: '7/45'
          },
          {
            label: '8:00',
            value: '8/00'
          }
        ],
        doctors: [
          {
            name: 'Natalia Nowak',
            workDaysDescription: 'WorkDays: Mon 15:00-17:15, Wen 15:00-19:00',
            id: 15
          },
          {
            name: 'Bartosz Bąk',
            workDaysDescription: 'WorkDays: Thu 12:00-14:15, Fri 13:00-18:00',
            id: 16
          },
          {
            name: 'Tomasz Lewandowski',
            workDaysDescription: 'WorkDays: Mon 10:00-17:00, Wen 10:00-19:00',
            id: 21
          }
        ],
        specializations: [
          {
            name: 'Chirurg',
            value: 'surgeon'
          },
          {
            name: 'Pediatra',
            value: 'pediatrician'
          },
          {
            name: 'Dentysta',
            value: 'dentist'
          }
        ]
      }
    };
  }

  _onAcceptDoctor() {
    let { disabled } = this.state;

    disabled.doctorPicker = true;
    disabled.datePicker = false;

    this.setState({
      disabled
    });
  }

  _onDoctorChange(value) {
    this.props.onChange('doctor', value);
  }

  _onSpecializationChange(value) {
    this.props.onChange('specialization', value);
  }

  _onDateChange(value) {
    this.props.onChange('date', value);
  }

  render() {
    let { sources, disabled } = this.state;
    let { values } = this.props;

    return (
      <Grid>
        <GridItem xsSize="6">
          <DoctorPickerBox
            selectedDoctorId={ values.doctor }
            selectedSpecialization={ values.specialization }
            sources={ sources }
            onDoctorChange={ this._onDoctorChange.bind(this) }
            onSpecializationChange={ this._onSpecializationChange.bind(this) }
            onAcceptDoctor={ this._onAcceptDoctor.bind(this) }
            disabled={ disabled.doctorPicker }
          />
        </GridItem>
        <GridItem xsSize="6">
          <TermPickerBox
            disabled={ disabled.datePicker }
            selectedDate={ values.date }
            onDateChange={ this._onDateChange.bind(this) }
          />
        </GridItem>
      </Grid>
    );
  }
}

PatientBookVisit.propTypes = {
  values: PropTypes.object,
  onChange: PropTypes.func,
};